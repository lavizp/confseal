import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  KEY_ENV_VAR,
  decrypt,
  encrypt,
  generateKey,
  keyToBuffer,
  loadKey,
  KEY_LENGTH,
} from "../src/utils/crypto.js";

describe("encrypt / decrypt", () => {
  it("round-trips plaintext without corruption", () => {
    const key = generateKey();
    const plaintext = "DATABASE_URL=postgres://localhost:5432\nSECRET=top secret value";

    const payload = encrypt(plaintext, key);

    expect(decrypt(payload, key)).toBe(plaintext);
  });

  it("round-trips unicode and special characters", () => {
    const key = generateKey();
    const plaintext = 'PASSWORD="p@ssw0rd! #$%&*"\nEMOJI=🚀\nNEWLINE=line1\\nline2';

    expect(decrypt(encrypt(plaintext, key), key)).toBe(plaintext);
  });

  it("produces a different payload each time for the same plaintext", () => {
    const key = generateKey();
    const plaintext = "SAME=value";

    const first = encrypt(plaintext, key);
    const second = encrypt(plaintext, key);

    expect(first).not.toBe(second);
  });

  it("embeds a 12-byte IV and 16-byte auth tag in the payload", () => {
    const key = generateKey();
    const payload = Buffer.from(encrypt("A=1", key), "base64");

    expect(payload.length).toBeGreaterThanOrEqual(12 + 16);
  });

  it("throws when the ciphertext has been tampered with", () => {
    const key = generateKey();
    const payload = Buffer.from(encrypt("A=1", key), "base64");

    payload[payload.length - 1]! ^= 0xff;
    const tampered = payload.toString("base64");

    expect(() => decrypt(tampered, key)).toThrow(/Decryption failed/);
  });

  it("throws when the auth tag has been modified", () => {
    const key = generateKey();
    const payload = Buffer.from(encrypt("A=1", key), "base64");

    payload[12]! ^= 0x01;
    const tampered = payload.toString("base64");

    expect(() => decrypt(tampered, key)).toThrow(/Decryption failed/);
  });

  it("throws when decrypted with the wrong key", () => {
    const payload = encrypt("A=1", generateKey());

    expect(() => decrypt(payload, generateKey())).toThrow(/Decryption failed/);
  });

  it("throws on a malformed payload", () => {
    const key = generateKey();
    expect(() => decrypt("not-base64!", key)).toThrow(/not valid base64/);
    expect(() => decrypt("c2hvcnQ=", key)).toThrow(/malformed/);
  });
});

describe("generateKey / keyToBuffer", () => {
  it("generates a 32-byte base64 key", () => {
    const key = generateKey();
    expect(keyToBuffer(key).length).toBe(KEY_LENGTH);
  });

  it("generates unique keys", () => {
    expect(generateKey()).not.toBe(generateKey());
  });

  it("rejects keys that are not 32 bytes", () => {
    expect(() => keyToBuffer(Buffer.from("short", "utf8").toString("base64"))).toThrow(
      /Invalid key length/,
    );
  });
});

describe("loadKey", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      rmSync(dir, { recursive: true, force: true });
    }
    delete process.env[KEY_ENV_VAR];
  });

  function makeTempDir(): string {
    const dir = mkdtempSync(join(tmpdir(), "confseal-test-"));
    tempDirs.push(dir);
    return dir;
  }

  it("prefers the CONFSEAL_KEY environment variable", () => {
    const dir = makeTempDir();
    const key = generateKey();
    process.env[KEY_ENV_VAR] = key;

    expect(loadKey(dir)).toBe(key);
  });

  it("reads the key from .confseal.key", () => {
    const dir = makeTempDir();
    const key = generateKey();
    writeFileSync(join(dir, ".confseal.key"), `${key}\n`);

    expect(loadKey(dir)).toBe(key);
  });

  it("throws an actionable error when no key is available", () => {
    const dir = makeTempDir();

    expect(() => loadKey(dir)).toThrow(/CONFSEAL_KEY/);
  });
});
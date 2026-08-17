import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  ENV_FILE,
  GITIGNORE_FILE,
  STORE_DIR,
  assertValidEnvironment,
  envFilePath,
  ensureGitignore,
  parseEnv,
  readEnvFile,
  storePath,
  stringifyEnv,
  writeEnvFile,
} from "../src/utils/env.js";

describe("parseEnv / stringifyEnv", () => {
  it("round-trips a set of variables", () => {
    const vars = {
      HOST: "localhost",
      PORT: "5432",
      SECRET: "a value with spaces and # chars",
    };

    const reparsed = parseEnv(stringifyEnv(vars));

    expect(reparsed).toEqual(vars);
  });

  it("parses quoted and multiline values", () => {
    const content = 'QUOTED="hello world"\nKEY=value\nEMPTY=';

    expect(parseEnv(content)).toEqual({ QUOTED: "hello world", KEY: "value", EMPTY: "" });
  });
});

describe("assertValidEnvironment", () => {
  it("accepts normal environment names", () => {
    expect(() => assertValidEnvironment("development")).not.toThrow();
    expect(() => assertValidEnvironment("staging-2")).not.toThrow();
    expect(() => assertValidEnvironment("PROD_x")).not.toThrow();
  });

  it("rejects path traversal and special characters", () => {
    expect(() => assertValidEnvironment("../evil")).toThrow(/Invalid environment/);
    expect(() => assertValidEnvironment("a/b")).toThrow(/Invalid environment/);
    expect(() => assertValidEnvironment("a b")).toThrow(/Invalid environment/);
  });
});

describe("paths", () => {
  it("builds store and env file paths", () => {
    expect(storePath("/proj", "development")).toBe(`/proj/${STORE_DIR}/development.enc`);
    expect(envFilePath("/proj")).toBe(`/proj/${ENV_FILE}`);
  });
});

describe("readEnvFile / writeEnvFile", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  function makeTempDir(): string {
    const dir = mkdtempSync(join(tmpdir(), "confseal-env-test-"));
    tempDirs.push(dir);
    return dir;
  }

  it("returns null for a missing .env file", () => {
    expect(readEnvFile(join(makeTempDir(), ENV_FILE))).toBeNull();
  });

  it("writes and reads back an env file", () => {
    const file = join(makeTempDir(), ENV_FILE);
    const vars = { A: "1", B: "two words" };

    writeEnvFile(file, vars);

    expect(readEnvFile(file)).toEqual(vars);
  });
});

describe("ensureGitignore", () => {
  const tempDirs: string[] = [];

  afterEach(() => {
    for (const dir of tempDirs.splice(0)) {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  function makeTempDir(): string {
    const dir = mkdtempSync(join(tmpdir(), "confseal-git-test-"));
    tempDirs.push(dir);
    return dir;
  }

  it("creates .gitignore ignoring the key and .env", () => {
    const dir = makeTempDir();

    ensureGitignore(dir);

    const content = readFileSync(join(dir, GITIGNORE_FILE), "utf8");
    expect(content).toContain(".confseal.key");
    expect(content).toContain(".env");
  });

  it("does not duplicate entries when run twice", () => {
    const dir = makeTempDir();

    ensureGitignore(dir);
    ensureGitignore(dir);

    const content = readFileSync(join(dir, GITIGNORE_FILE), "utf8");
    expect(content.match(/\.confseal\.key/g)).toHaveLength(1);
    expect(content.match(/^\.env$/m)).toHaveLength(1);
  });

  it("appends to an existing .gitignore without removing entries", () => {
    const dir = makeTempDir();
    writeFileSync(join(dir, GITIGNORE_FILE), "node_modules/\ndist/\n");

    ensureGitignore(dir);

    const content = readFileSync(join(dir, GITIGNORE_FILE), "utf8");
    expect(content).toContain("node_modules/");
    expect(content).toContain(".confseal.key");
  });

  it("leaves .confseal/*.enc unignored (tracked)", () => {
    const dir = makeTempDir();
    ensureGitignore(dir);

    const content = readFileSync(join(dir, GITIGNORE_FILE), "utf8");
    expect(content).not.toContain("*.enc");
    expect(content).not.toContain(".confseal/");
  });
});
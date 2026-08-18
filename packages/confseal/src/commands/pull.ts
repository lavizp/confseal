import { existsSync, readFileSync } from "node:fs";
import { decrypt, loadKey } from "../utils/crypto.js";
import {
  assertValidEnvironment,
  envFilePath,
  parseEnv,
  readEnvFile,
  storePath,
  writeEnvFile,
} from "../utils/env.js";
import { success } from "../utils/logger.js";

export interface PullOptions {
  merge?: boolean;
}

/**
 * Decrypts the encrypted store for an environment and writes the variables
 * to the local .env file. Overwrites by default, or merges with --merge.
 */
export function pullCommand(
  environment: string,
  options: PullOptions,
  projectRoot = process.cwd(),
): void {
  assertValidEnvironment(environment);

  const key = loadKey(projectRoot);
  const payload = readFileSync(storePath(projectRoot, environment), "utf8");

  const vars = payload.trim() === "" ? {} : parseEnv(decrypt(payload, key));
  const target = envFilePath(projectRoot);

  if (options.merge && existsSync(target)) {
    const existing = readEnvFile(target) ?? {};
    writeEnvFile(target, { ...existing, ...vars });
    success(`Merged ${environment} into ${envFilePath(projectRoot)}`);
    return;
  }

  writeEnvFile(target, vars);
  success(`Successfully pulled ${environment} into ${envFilePath(projectRoot)}`);
}
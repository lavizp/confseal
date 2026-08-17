import { existsSync, writeFileSync } from "node:fs";
import { encrypt, loadKey } from "../utils/crypto.js";
import {
  assertValidEnvironment,
  envFilePath,
  readEnvFile,
  storePath,
  stringifyEnv,
} from "../utils/env.js";
import { success } from "../utils/logger.js";

/**
 * Encrypts the local .env file into the encrypted store for an environment.
 */
export function pushCommand(environment: string, projectRoot = process.cwd()): void {
  assertValidEnvironment(environment);

  const localEnv = envFilePath(projectRoot);
  if (!existsSync(localEnv)) {
    throw new Error(
      `No ${envFilePath(projectRoot)} file found in the project root.\n` +
        `Create a .env file first, then run 'confseal push ${environment}'.`,
    );
  }

  const vars = readEnvFile(localEnv);
  if (!vars) {
    throw new Error(`The .env file at ${localEnv} could not be parsed.`);
  }

  const key = loadKey(projectRoot);
  const payload = encrypt(stringifyEnv(vars), key);

  const destination = storePath(projectRoot, environment);
  writeFileSync(destination, payload);

  success(`Successfully pushed local .env to ${environment}.enc`);
}
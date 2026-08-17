import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { KEY_FILE, generateKey } from "../utils/crypto.js";
import { ENV_FILE, STORE_DIR, ensureGitignore } from "../utils/env.js";
import { info, success } from "../utils/logger.js";
import { DEFAULT_ENVIRONMENTS } from "../types.js";

/**
 * Scaffolds the encrypted store, generates the decryption key, creates
 * empty encrypted files for each default environment, and updates .gitignore.
 */
export function initCommand(projectRoot = process.cwd()): void {
  const storeDir = join(projectRoot, STORE_DIR);
  mkdirSync(storeDir, { recursive: true });

  const keyFilePath = join(projectRoot, KEY_FILE);
  if (!existsSync(keyFilePath)) {
    writeFileSync(keyFilePath, `${generateKey()}\n`, { mode: 0o600 });
    success(`Generated encryption key at ${KEY_FILE}`);
  } else {
    info(`${KEY_FILE} already exists, leaving it untouched`);
  }

  const envFilePath = join(projectRoot, ENV_FILE);
  if (!existsSync(envFilePath)) {
    writeFileSync(envFilePath, "");
    info(`Created empty ${ENV_FILE}`);
  } else {
    info(`${ENV_FILE} already exists, leaving it untouched`);
  }

  for (const environment of DEFAULT_ENVIRONMENTS) {
    const storeFile = join(storeDir, `${environment}.enc`);
    if (!existsSync(storeFile)) {
      writeFileSync(storeFile, "");
    }
  }

  ensureGitignore(projectRoot);
  success(`Initialized encrypted store in ${STORE_DIR}/`);
}
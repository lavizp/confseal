import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { decrypt, encrypt, loadKey } from "../utils/crypto.js";
import {
  assertValidEnvironment,
  parseEnv,
  storePath,
  stringifyEnv,
} from "../utils/env.js";
import { success } from "../utils/logger.js";
import type { EnvVars } from "../types.js";

const KEY_PATTERN = /^[A-Za-z_][A-Za-z0-9_]*$/;

export interface SetOptions {
  env: string;
}

/**
 * Updates or adds a single environment variable in the encrypted store
 * for a given environment.
 */
export function setCommand(
  assignment: string,
  options: SetOptions,
  projectRoot = process.cwd(),
): void {
  assertValidEnvironment(options.env);

  const separatorIndex = assignment.indexOf("=");
  if (separatorIndex === -1) {
    throw new Error(
      `Invalid assignment "${assignment}". Expected the form KEY=VALUE.`,
    );
  }

  const variableName = assignment.slice(0, separatorIndex).trim();
  const value = assignment.slice(separatorIndex + 1);
  if (!KEY_PATTERN.test(variableName)) {
    throw new Error(
      `Invalid variable name "${variableName}". ` +
        `Names must start with a letter or underscore, followed by letters, digits, or underscores.`,
    );
  }

  const key = loadKey(projectRoot);
  const storeFile = storePath(projectRoot, options.env);
  if (!existsSync(storeFile)) {
    throw new Error(
      `No encrypted store found for "${options.env}". ` +
        `Run 'confseal init' first.`,
    );
  }

  const payload = readFileSync(storeFile, "utf8");
  const vars: EnvVars = payload.trim() === "" ? {} : parseEnv(decrypt(payload, key));
  vars[variableName] = value;

  writeFileSync(storeFile, encrypt(stringifyEnv(vars), key));
  success(`Set ${variableName} in ${options.env}`);
}
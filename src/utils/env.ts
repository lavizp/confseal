import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse as dotenvParse } from "dotenv";
import { IGNORE_ENTRIES, type EnvVars } from "../types.js";

export const STORE_DIR = ".confseal";
export const ENV_FILE = ".env";
export const GITIGNORE_FILE = ".gitignore";

const ENVIRONMENT_PATTERN = /^[A-Za-z0-9_-]+$/;

/** Parses .env-formatted content into a key-value object. */
export function parseEnv(content: string): EnvVars {
  return dotenvParse(content) as EnvVars;
}

/** Serializes a key-value object back into dotenv-compatible format. */
export function stringifyEnv(vars: EnvVars): string {
  const lines = Object.entries(vars).map(([name, value]) => `${name}=${quoteValue(value)}`);
  return lines.length > 0 ? `${lines.join("\n")}\n` : "";
}

function quoteValue(value: string): string {
  if (/^[A-Za-z0-9_./:@%-]*$/.test(value)) {
    return value;
  }
  const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
  return `"${escaped}"`;
}

/** Reads and parses a .env file. Returns null if the file does not exist. */
export function readEnvFile(filePath: string): EnvVars | null {
  if (!existsSync(filePath)) return null;
  return parseEnv(readFileSync(filePath, "utf8"));
}

/** Writes a .env file from a key-value object. */
export function writeEnvFile(filePath: string, vars: EnvVars): void {
  writeFileSync(filePath, stringifyEnv(vars));
}

/** Returns the path of the encrypted store file for a given environment. */
export function storePath(projectRoot: string, environment: string): string {
  return join(projectRoot, STORE_DIR, `${environment}.enc`);
}

/** Returns the path of the local .env file at the project root. */
export function envFilePath(projectRoot: string): string {
  return join(projectRoot, ENV_FILE);
}

/** Returns the path of the .gitignore file at the project root. */
export function gitignorePath(projectRoot: string): string {
  return join(projectRoot, GITIGNORE_FILE);
}

/**
 * Validates an environment name, rejecting anything that could escape
 * the store directory or reference nested paths.
 */
export function assertValidEnvironment(environment: string): void {
  if (!ENVIRONMENT_PATTERN.test(environment)) {
    throw new Error(
      `Invalid environment "${environment}". ` +
        `Environment names may only contain letters, numbers, hyphens, and underscores.`,
    );
  }
}

/**
 * Ensures the project .gitignore ignores the encryption key and raw .env file
 * while leaving encrypted store files (.confseal/*.enc) tracked.
 */
export function ensureGitignore(projectRoot: string): void {
  const filePath = gitignorePath(projectRoot);
  const existing = existsSync(filePath) ? readFileSync(filePath, "utf8") : "";

  const needed = [IGNORE_ENTRIES.keyFile, IGNORE_ENTRIES.envFile];
  const missing = needed.filter((entry) => !isIgnored(existing, entry));

  if (missing.length === 0) return;

  const separator = existing && !existing.endsWith("\n") ? "\n" : "";
  const block = `${separator}# confseal\n${missing.join("\n")}\n`;
  writeFileSync(filePath, existing + block);
}

function isIgnored(content: string, entry: string): boolean {
  const lines = content.split("\n").map((line) => line.trim());
  return lines.includes(entry);
}
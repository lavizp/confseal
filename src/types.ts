/** The raw bytes composing an encrypted payload. */
export interface EncryptedPayload {
  /** 12-byte initialization vector. */
  iv: Buffer;
  /** 16-byte GCM authentication tag. */
  tag: Buffer;
  /** AES-256-GCM ciphertext. */
  ciphertext: Buffer;
}

/** A set of environment variables keyed by name. */
export type EnvVars = Record<string, string>;

/** Valid environment names for the built-in stores. */
export const DEFAULT_ENVIRONMENTS = ["development", "staging", "production"] as const;

/** Patterns used to ensure git tracks encrypted files but ignores secrets. */
export const IGNORE_ENTRIES = {
  keyFile: ".confseal.key",
  envFile: ".env",
} as const;
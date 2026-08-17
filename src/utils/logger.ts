import pc from "picocolors";

/** Prints a green success message. */
export function success(message: string): void {
  console.log(pc.green(`✅ ${message}`));
}

/** Prints a cyan informational message. */
export function info(message: string): void {
  console.log(pc.cyan(`ℹ ${message}`));
}

/** Prints a red error message and exits with a non-zero status. */
export function handleError(error: unknown): never {
  const message = error instanceof Error ? error.message : String(error);
  console.error(pc.red(`✖ ${message}`));
  process.exit(1);
}
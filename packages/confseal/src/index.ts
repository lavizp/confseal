import { createRequire } from "node:module";
import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { pullCommand } from "./commands/pull.js";
import { pushCommand } from "./commands/push.js";
import { setCommand } from "./commands/set.js";
import { handleError } from "./utils/logger.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json") as { version: string };

const program = new Command();

program
  .name("confseal")
  .description(
    "Securely manage and encrypt environment variables per environment inside your project repository.",
  )
  .version(pkg.version);

program
  .command("init")
  .description("Scaffold the encrypted store, key, and .gitignore rules")
  .action(() => {
    try {
      initCommand();
    } catch (error) {
      handleError(error);
    }
  });

program
  .command("pull <environment>")
  .description("Decrypt an environment store into the local .env file")
  .option("--merge", "merge with the existing .env instead of overwriting it")
  .action((environment: string, options: { merge?: boolean }) => {
    try {
      pullCommand(environment, options);
    } catch (error) {
      handleError(error);
    }
  });

program
  .command("push <environment>")
  .description("Encrypt the local .env file into an environment store")
  .action((environment: string) => {
    try {
      pushCommand(environment);
    } catch (error) {
      handleError(error);
    }
  });

program
  .command("set <KEY=VALUE>")
  .description("Set or update a single variable in an environment store")
  .requiredOption("--env <environment>", "environment to update")
  .action((assignment: string, options: { env: string }) => {
    try {
      setCommand(assignment, options);
    } catch (error) {
      handleError(error);
    }
  });

program.parseAsync(process.argv).catch(handleError);
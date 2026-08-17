# Role and Goal
You are an expert Node.js and TypeScript developer specializing in building secure, production-grade CLI tools. Your task is to build a complete npm package called `envstore`. 

# Project Overview
`envstore` is a CLI tool that securely manages and encrypts environment variables for different environments (development, staging, production) directly within a project repository. 

# Tech Stack & Libraries
- **Language:** TypeScript (Node.js)
- **CLI Framework:** `commander` (for robust command parsing and help generation)
- **Env Parsing:** `dotenv` (for parsing and stringifying .env contents)
- **Encryption:** Node.js native `crypto` module (AES-256-GCM)
- **Formatting/Linting:** Prettier & ESLint
- **Testing:** Vitest or Jest
- **Build Tool:** `tsup` or `tsc` (for compiling to a lightweight executable)

# Core Features & Commands

## 1. `envstore init`
**Behavior:** Scaffolds the necessary files and directories in the user's project.
**File Structure Expected:**
my-project/
├── .env
├── .gitignore
├── .envstore.key (Newly generated decryption key)
└── .envstore/
    ├── development.enc
    ├── staging.enc
    └── production.enc
**Actions:**
- Create the `.envstore/` directory.
- Generate a secure, random cryptographic key and save it to `.envstore.key`.
- Create empty encrypted files for `development`, `staging`, and `production`.
- **Crucial Git Operations:** Automatically update the `.gitignore` file. The standard security pattern for tools like this is:
  1. Commit the encrypted files (`.envstore/*.enc`).
  2. Ignore the decryption key (`.envstore.key`) and the raw output (`.env`).

## 2. `envstore pull <environment>`
**Behavior:** Extracts variables from the encrypted store and writes them to the local `.env` file.
**Actions:**
- Look for the decryption key in the `.envstore.key` file or an `ENVSTORE_KEY` environment variable.
- Read `.envstore/<environment>.enc`.
- Decrypt the file contents.
- Overwrite or merge the contents into the local `.env` file at the root of the project.
- Print a success message (e.g., "✅ Successfully pulled <environment> into .env").

## 3. `envstore push <environment>`
**Behavior:** Takes the current local `.env` file and encrypts its contents into the specified environment store.
**Actions:**
- Locate the encryption key.
- Verify that a local `.env` file exists in the root directory. If not, throw a clear error.
- Read the local `.env` file.
- Encrypt the file contents.
- Write the encrypted payload to `.envstore/<environment>.enc` (overwriting the current encrypted file).
- Print a success message (e.g., "✅ Successfully pushed local .env to <environment>.enc").

## 4. `envstore set <KEY>=<VALUE> --env <environment>`
**Behavior:** Updates or adds a specific environment variable in the encrypted store.
**Actions:**
- Locate the decryption key.
- Read and decrypt `.envstore/<environment>.enc`.
- Parse the decrypted string into a key-value object (using `dotenv`).
- Update the specific `<KEY>` with the new `<VALUE>`.
- Stringify the updated object back to `.env` format.
- Encrypt the new string and save it back to `.envstore/<environment>.enc`.
- Print a success message.

# Non-Functional & Production Requirements

1. **Security First:** Use AES-256-GCM for encryption. Ensure an initialization vector (IV) and auth tag are generated and appended/prepended to the encrypted payload so it can be reliably decrypted. Enforce the Git security pattern by ensuring the CLI always ignores `.envstore.key` and `.env` while tracking `.enc` files.
2. **Error Handling:** Provide incredibly clear, user-friendly CLI error messages. (e.g., If `envstore pull` or `push` is run without a key, tell the user exactly how to set the `ENVSTORE_KEY`). Use `chalk` or `picocolors` for terminal coloring.
3. **Type Safety:** Use strict TypeScript configurations. Create distinct types/interfaces for the encryption payload and configuration.
4. **Publishing Ready:** Set up the `package.json` with the correct `bin` field, `files` array, and `scripts` (build, test, prepublish) so the package is ready to be published to npm immediately.

# Implementation Steps
Please implement this project step-by-step:
1. Provide the `package.json` and `tsconfig.json` setup.
2. Write the core encryption/decryption utility functions (`src/utils/crypto.ts`).
3. Write the file system and dotenv parsing utilities (`src/utils/env.ts`).
4. Implement the CLI commands using Commander (`src/index.ts` and `src/commands/*.ts`).
5. Provide a basic test suite for the encryption logic to ensure data is not corrupted during the encrypt/decrypt cycle.

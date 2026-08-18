# confseal

Securely manage and encrypt environment variables per environment inside your project repository.

[![npm version](https://img.shields.io/npm/v/confseal.svg)](https://www.npmjs.com/package/confseal)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)

`confseal` lets you store environment variables for `development`, `staging`, and `production`
directly in your repository — encrypted with AES-256-GCM — so secrets stay safe while still being
version-controlled and shareable with your team.

## Features

- **AES-256-GCM encryption** via Node's native `crypto` module — no extra crypto dependencies.
- **Per-environment stores** (`development`, `staging`, `production` by default, or any name you choose).
- **Git-safe by default** — encrypted `.enc` files are committed, while the key and raw `.env` are ignored.
- **Flexible key handling** — read from a `.confseal.key` file or the `CONFSEAL_KEY` environment variable.
- **Clear, actionable errors** — helpful messages when keys or stores are missing or malformed.
- **Zero config** — one command scaffolds everything you need.

## Requirements

- Node.js **>= 18**

## Installation

```bash
npm install -g confseal
```

## Quick Start

```bash
# 1. Scaffold the store, key, and .gitignore rules
confseal init

# 2. Set a variable in the production store
confseal set "API_KEY=abc123" --env production

# 3. Pull an environment's variables into your local .env
confseal pull production
```

## Commands

### `confseal init`

Scaffolds the encrypted store, generates a decryption key, creates empty stores for each
default environment, and updates your `.gitignore`.

```
confseal init
```

### `confseal pull <environment>`

Decrypts an environment store and writes the variables to your local `.env` file.
Overwrites the file by default; use `--merge` to keep existing values.

```
confseal pull <environment> [--merge]
```

### `confseal push <environment>`

Encrypts your local `.env` file into the specified environment store.

```
confseal push <environment>
```

### `confseal set <KEY=VALUE> --env <environment>`

Sets or updates a single variable in an environment store without touching your local `.env`.

```
confseal set <KEY=VALUE> --env <environment>
```

## How It Works

Running `confseal init` creates the following structure in your project:

```
my-project/
├── .env                 # raw variables (git-ignored)
├── .gitignore           # updated to ignore key + .env
├── .confseal.key        # decryption key (git-ignored, mode 0600)
└── .confseal/
    ├── development.enc  # encrypted store (committed)
    ├── staging.enc      # encrypted store (committed)
    └── production.enc   # encrypted store (committed)
```

### Encryption payload

Each encrypted store uses AES-256-GCM. The stored payload is the 12-byte initialization vector
(IV), the 16-byte GCM authentication tag, and the ciphertext — all base64-encoded. The auth tag
ensures any tampering or corruption is detected on decryption.

### Key management

`confseal` locates the encryption key in this order:

1. The `CONFSEAL_KEY` environment variable, or
2. The `.confseal.key` file at your project root.

```bash
# Use an env var instead of a key file
export CONFSEAL_KEY="$(cat .confseal.key)"
```

> **Security note:** Treat `.confseal.key` like a password. Never commit it. The `.gitignore`
> rules added by `confseal init` are designed to keep it (and `.env`) out of version control
> while committing the encrypted stores.

## Development

```bash
npm install          # install dependencies
npm run build        # compile with tsup
npm test             # run the test suite (vitest)
npm run lint         # run eslint
npm run typecheck    # type-check with tsc
```

## License

[MIT](LICENSE)

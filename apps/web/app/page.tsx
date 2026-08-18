import type { ReactNode } from "react";
import { CopyButton } from "@/components/copy-button";

const GITHUB_URL = "https://github.com/lavizp/confseal";
const NPM_URL = "https://www.npmjs.com/package/confseal";
const INSTALL_COMMAND = "npm install -g confseal";

/* ---------------------------------- icons --------------------------------- */

function Icon({
  children,
  className = "h-5 w-5",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Icon>
  );
}

function LayersIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </Icon>
  );
}

function GitBranchIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </Icon>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
      <path d="m21 2-9.6 9.6" />
      <circle cx="7.5" cy="15.5" r="5.5" />
    </Icon>
  );
}

function CircleAlertIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </Icon>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </Icon>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <Icon className={className}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </Icon>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

/* --------------------------------- content -------------------------------- */

const FEATURES = [
  {
    icon: LockIcon,
    title: "AES-256-GCM encryption",
    description:
      "Authenticated encryption built on Node's native crypto module. No extra crypto dependencies, nothing extra to audit.",
  },
  {
    icon: LayersIcon,
    title: "Per-environment stores",
    description:
      "development, staging, and production out of the box — or name your own. Every environment gets its own encrypted store.",
  },
  {
    icon: GitBranchIcon,
    title: "Git-safe by default",
    description:
      "Encrypted .enc files are committed while the key and raw .env stay ignored. Secrets never leak into your history.",
  },
  {
    icon: KeyIcon,
    title: "Flexible key handling",
    description:
      "Read the key from a .confseal.key file or the CONFSEAL_KEY environment variable — whatever fits your workflow.",
  },
  {
    icon: CircleAlertIcon,
    title: "Clear, actionable errors",
    description:
      "Missing key? Malformed store? confseal tells you exactly what went wrong and how to fix it.",
  },
  {
    icon: ZapIcon,
    title: "Zero config",
    description:
      "One command scaffolds the store, generates your key, and updates .gitignore. That is the entire setup.",
  },
];

const STEPS = [
  {
    command: "confseal init",
    description:
      "Scaffold the encrypted store, generate a decryption key, and update .gitignore in a single shot.",
  },
  {
    command: 'confseal set "API_KEY=abc123" --env production',
    description:
      "Set individual variables per environment — or encrypt your whole local .env at once with confseal push.",
  },
  {
    command: "confseal pull production",
    description:
      "Decrypt any environment into your local .env. Pass --merge to keep the values you already have.",
  },
];

const FILE_TREE = [
  { text: "my-project/" },
  { text: "├── .env", comment: "raw variables (git-ignored)", safe: false },
  {
    text: "├── .gitignore",
    comment: "updated to ignore key + .env",
    safe: false,
  },
  {
    text: "├── .confseal.key",
    comment: "decryption key (git-ignored, mode 0600)",
    safe: false,
  },
  { text: "└── .confseal/" },
  {
    text: "    ├── development.enc",
    comment: "encrypted store (committed)",
    safe: true,
  },
  {
    text: "    ├── staging.enc",
    comment: "encrypted store (committed)",
    safe: true,
  },
  {
    text: "    └── production.enc",
    comment: "encrypted store (committed)",
    safe: true,
  },
];

const COMMANDS = [
  {
    signature: "confseal init",
    description:
      "Scaffold the encrypted store, generate a key, and add .gitignore rules.",
  },
  {
    signature: "confseal pull <environment> [--merge]",
    description:
      "Decrypt a store into your local .env. Overwrites by default; --merge keeps existing values.",
  },
  {
    signature: "confseal push <environment>",
    description: "Encrypt your local .env into the given environment store.",
  },
  {
    signature: "confseal set <KEY=VALUE> --env <environment>",
    description:
      "Set or update a single variable without touching your local .env.",
  },
];

/* ------------------------------- components ------------------------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <LockIcon className="h-4.5 w-4.5 text-emerald-600" />
          <span className="text-[15px] font-semibold tracking-tight">
            confseal
          </span>
        </a>
        <nav className="flex items-center gap-6">
          <div className="hidden items-center gap-6 text-sm text-zinc-600 sm:flex">
            <a href="#features" className="transition-colors hover:text-zinc-950">
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition-colors hover:text-zinc-950"
            >
              How it works
            </a>
            <a href="#commands" className="transition-colors hover:text-zinc-950">
              Commands
            </a>
          </div>
          <span className="hidden h-4 w-px bg-zinc-200 sm:block" />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="confseal on GitHub"
            className="text-zinc-500 transition-colors hover:text-zinc-950"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href="#quickstart"
            className="hidden h-9 items-center rounded-full bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:inline-flex"
          >
            Get started
          </a>
        </nav>
      </div>
    </header>
  );
}

function InstallBar({ centered = false }: { centered?: boolean }) {
  return (
    <div
      className={`flex w-full max-w-md items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-4 pr-1.5 font-mono text-sm shadow-sm ${
        centered ? "mx-auto" : ""
      }`}
    >
      <span className="truncate text-zinc-800">
        <span className="mr-2 select-none text-emerald-600">$</span>
        {INSTALL_COMMAND}
      </span>
      <CopyButton text={INSTALL_COMMAND} />
    </div>
  );
}

function Terminal() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-left shadow-2xl shadow-zinc-950/20">
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 font-mono text-xs text-zinc-500">
          ~/my-project
        </span>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-[13px] leading-7">
        <p>
          <span className="text-emerald-400">$ </span>
          <span className="text-zinc-100">confseal init</span>
        </p>
        <p className="text-zinc-500">
          ✅ Generated encryption key at .confseal.key
        </p>
        <p className="text-zinc-500">
          ✅ Initialized encrypted store in .confseal/
        </p>
        <p className="mt-4">
          <span className="text-emerald-400">$ </span>
          <span className="text-zinc-100">
            confseal set <span className="text-emerald-300">&quot;API_KEY=abc123&quot;</span> --env production
          </span>
        </p>
        <p className="text-zinc-500">✅ Set API_KEY in production</p>
        <p className="mt-4">
          <span className="text-emerald-400">$ </span>
          <span className="text-zinc-100">confseal pull production</span>
        </p>
        <p className="text-zinc-500">
          ✅ Successfully pulled production into .env
        </p>
      </div>
    </div>
  );
}

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-emerald-600">
        {label}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-zinc-600">{description}</p>
      ) : null}
    </div>
  );
}

/* --------------------------------- sections ------------------------------- */

function Hero() {
  return (
    <section id="quickstart" className="relative scroll-mt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-emerald-50/80 to-transparent"
      />
      <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-24 text-center sm:pt-32">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-600 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          AES-256-GCM · Zero-config · Node.js ≥ 18
        </p>
        <h1 className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-zinc-950 sm:text-6xl">
          Environment secrets,{" "}
          <span className="text-emerald-600">sealed</span> in your repo.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-8 text-zinc-600">
          confseal encrypts your environment variables and stores them per
          environment — right inside your repository. Version-controlled,
          shareable with your team, and safe to commit.
        </p>
        <div className="mt-10">
          <InstallBar centered />
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#how-it-works"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 sm:w-auto"
          >
            Get started
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-300 hover:bg-zinc-50 sm:w-auto"
          >
            <GitHubIcon className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
        <div className="mx-auto mt-16 max-w-3xl sm:mt-20">
          <Terminal />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-16 border-t border-zinc-200">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading
          label="Features"
          title="Everything you need. Nothing you don't."
          description="A single-purpose CLI that keeps secrets encrypted, versioned, and out of your way."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-emerald-600/40 hover:bg-emerald-50/30"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                <feature.icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-zinc-950">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 border-t border-zinc-200">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading
          label="How it works"
          title="Three commands. That's the workflow."
          description="Encrypted stores live in your repo next to your code. The key and the raw .env never do."
        />
        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <ol className="space-y-8">
            {STEPS.map((step, index) => (
              <li key={step.command} className="flex gap-5">
                <span className="font-mono text-sm font-medium text-emerald-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <code className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[13px] text-zinc-900">
                    {step.command}
                  </code>
                  <p className="mt-2.5 text-sm leading-6 text-zinc-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-5 font-mono text-[13px] leading-7">
            {FILE_TREE.map((line) => (
              <div key={line.text} className="whitespace-pre">
                <span className="text-zinc-800">{line.text}</span>
                {line.comment ? (
                  <span
                    className={
                      line.safe ? "text-emerald-600" : "text-zinc-400"
                    }
                  >
                    {"  # "}
                    {line.comment}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Commands() {
  return (
    <section id="commands" className="scroll-mt-16 border-t border-zinc-200">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading
          label="Commands"
          title="A CLI you can learn in one glance"
        />
        <div className="mt-12 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
          {COMMANDS.map((command) => (
            <div
              key={command.signature}
              className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-2 sm:items-center sm:gap-6 sm:p-6"
            >
              <code className="w-fit rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 font-mono text-[13px] text-zinc-900">
                {command.signature}
              </code>
              <p className="text-sm leading-6 text-zinc-600">
                {command.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security() {
  return (
    <section id="security" className="scroll-mt-16 border-t border-zinc-200">
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <SectionHeading
          label="Security"
          title="Sealed means sealed."
          description="Every store is encrypted with AES-256-GCM. The payload holds the IV, the GCM auth tag, and the ciphertext — so tampering or corruption fails loudly on decrypt."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheckIcon className="h-4.5 w-4.5" />
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-zinc-950">
              Tamper-proof by design
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-zinc-600">
              The 12-byte IV, 16-byte auth tag, and ciphertext are stored
              base64-encoded. GCM authentication means a flipped bit anywhere in
              the store is detected — never silently decrypted.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <KeyIcon className="h-4.5 w-4.5" />
            </div>
            <h3 className="mt-4 text-[15px] font-semibold text-zinc-950">
              Key management, your way
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-zinc-600">
              confseal resolves the key from the{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-900">
                CONFSEAL_KEY
              </code>{" "}
              environment variable first, then the{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-900">
                .confseal.key
              </code>{" "}
              file — created with mode 0600.
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-600/20 bg-emerald-50/60 p-5">
          <LockIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600" />
          <p className="text-sm leading-6 text-zinc-700">
            Treat{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-900 ring-1 ring-zinc-200">
              .confseal.key
            </code>{" "}
            like a password. The .gitignore rules written by{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-900 ring-1 ring-zinc-200">
              confseal init
            </code>{" "}
            keep the key and your raw .env out of version control — while the
            encrypted stores get committed and shared.
          </p>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-zinc-200">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24">
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          Seal your first secret in under a minute.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base leading-7 text-zinc-600">
          Install the CLI, run three commands, and never Slack a .env file
          again.
        </p>
        <div className="mt-8">
          <InstallBar centered />
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-800"
        >
          Read the README on GitHub
          <ArrowUpRightIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <LockIcon className="h-4 w-4 text-emerald-600" />
          <span className="font-semibold text-zinc-950">confseal</span>
          <span aria-hidden="true">·</span>
          <span>MIT License</span>
          <span aria-hidden="true">·</span>
          <span>Node.js ≥ 18</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-950"
          >
            GitHub
          </a>
          <a
            href={NPM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-950"
          >
            npm
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function Home() {
  return (
    <div className="bg-white font-sans text-zinc-950 antialiased selection:bg-emerald-200/60">
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Commands />
        <Security />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

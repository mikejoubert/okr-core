#!/usr/bin/env node
/**
 * OKR Core — cross-runtime installer.
 *
 * Copies the plugin payload (agents/, commands/, skills/, src/) into a Claude
 * Code plugin location so the OKR project-manager loop is available without any
 * manual file shuffling.
 *
 * Cross-runtime: written in dependency-free ESM against the `node:` API surface,
 * which is honoured by Node (>=18), Bun, and Deno (`deno run -A`). No transpile
 * step, no third-party packages.
 *
 *   Global (all projects):   npx @okr-core/cli --global
 *   Local (this repo only):  npx @okr-core/cli --local
 *   Custom target:           npx @okr-core/cli --dest /path/to/.claude/plugins
 *
 * Idempotent: re-running overwrites the installed copy in place.
 */

import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = resolve(__dirname, "..");
const PLUGIN_NAME = "okr-core";

// Payload directories copied verbatim into the install target.
const PAYLOAD = ["agents", "commands", "skills", "src", ".claude-plugin"];

function parseArgs(argv) {
  const args = { scope: null, dest: null, force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--global" || a === "-g") args.scope = "global";
    else if (a === "--local" || a === "-l") args.scope = "local";
    else if (a === "--dest" || a === "-d") args.dest = argv[++i];
    else if (a === "--force" || a === "-f") args.force = true;
    else if (a === "--help" || a === "-h") args.help = true;
  }
  return args;
}

function resolveTarget({ scope, dest }) {
  if (dest) return resolve(dest, PLUGIN_NAME);
  // Claude Code discovers plugins under ~/.claude/plugins (global)
  // or <cwd>/.claude/plugins (project-local).
  const base =
    scope === "local"
      ? join(process.cwd(), ".claude", "plugins")
      : join(homedir(), ".claude", "plugins");
  return join(base, PLUGIN_NAME);
}

function printHelp() {
  console.log(`
OKR Core installer

Usage:
  okr-core --global        Install for every project (~/.claude/plugins)
  okr-core --local         Install for the current project (./.claude/plugins)
  okr-core --dest <dir>    Install into a custom plugins directory
  okr-core --force         Overwrite an existing install without prompting

After install, open Claude Code and run:  /okr-discuss
`);
}

async function detectRuntime() {
  if (typeof Deno !== "undefined") return "deno";
  if (typeof Bun !== "undefined") return "bun";
  return `node ${process.version}`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || (!args.scope && !args.dest)) {
    printHelp();
    if (!args.scope && !args.dest) process.exit(args.help ? 0 : 1);
    return;
  }

  const runtime = await detectRuntime();
  const target = resolveTarget(args);
  console.log(`OKR Core installer  (runtime: ${runtime})`);
  console.log(`Source: ${PKG_ROOT}`);
  console.log(`Target: ${target}`);

  if (existsSync(target) && !args.force) {
    console.log("\nTarget already exists — refreshing in place (idempotent).");
  }

  await mkdir(dirname(target), { recursive: true });
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });

  for (const dir of PAYLOAD) {
    const from = join(PKG_ROOT, dir);
    if (!existsSync(from)) continue;
    await cp(from, join(target, dir), { recursive: true });
    console.log(`  + ${dir}/`);
  }

  // Drop a manifest so a later run / uninstaller knows what we placed here.
  const manifest = {
    plugin: PLUGIN_NAME,
    installedAt: new Date().toISOString(),
    runtime,
    source: PKG_ROOT,
    payload: PAYLOAD,
  };
  await writeFile(
    join(target, ".okr-install.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );

  console.log(`\n✔ Installed OKR Core → ${target}`);
  console.log("Open Claude Code and run  /okr-discuss  to start the loop.");
}

main().catch((err) => {
  console.error("\n✖ OKR Core install failed:", err?.message ?? err);
  process.exit(1);
});

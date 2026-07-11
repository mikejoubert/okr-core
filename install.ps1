<#
  OKR Core — Windows PowerShell bootstrap installer.

  Resolves whichever JS runtime is available (node > bun > deno) and hands off
  to bin/okr-install.mjs. Pass through any flags, e.g.:

    ./install.ps1 --global
    ./install.ps1 --local
    irm https://raw.githubusercontent.com/mikejoubert/okr-core/main/install.ps1 | iex   # then re-run with a flag
#>
param([Parameter(ValueFromRemainingArguments = $true)] [string[]] $Args)

$ErrorActionPreference = "Stop"
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$entry = Join-Path $scriptDir "bin/okr-install.mjs"

if (-not (Test-Path $entry)) {
  Write-Error "Cannot find $entry - run from a checked-out okr-core repo."
  exit 1
}

function Resolve-Runtime {
  foreach ($rt in @("node", "bun", "deno")) {
    if (Get-Command $rt -ErrorAction SilentlyContinue) { return $rt }
  }
  return $null
}

$runtime = Resolve-Runtime
if (-not $runtime) {
  Write-Error "No JS runtime found. Install Node 18+, Bun, or Deno and retry."
  exit 1
}

switch ($runtime) {
  "deno" { & deno run -A $entry @Args }
  default { & $runtime $entry @Args }
}

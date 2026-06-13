$ErrorActionPreference = "Stop"

pnpm.cmd format:check
pnpm.cmd contracts:validate
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd build

if (Get-Command go -ErrorAction SilentlyContinue) {
  Push-Location clients/compute
  try {
    go test ./...
  }
  finally {
    Pop-Location
  }
}
else {
  Write-Warning "Go is not installed; skipping compute-client verification."
}

python -m pytest workers/verifier/tests

if (Get-Command tofu -ErrorAction SilentlyContinue) {
  tofu -chdir=infrastructure/opentofu fmt -check
  tofu -chdir=infrastructure/opentofu validate
}
else {
  Write-Warning "OpenTofu is not installed; skipping infrastructure validation."
}

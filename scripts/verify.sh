#!/usr/bin/env sh
set -eu

pnpm format:check
pnpm contracts:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build

if command -v go >/dev/null 2>&1; then
  (cd clients/compute && go test ./...)
else
  echo "warning: Go is not installed; skipping compute-client verification" >&2
fi

python -m pytest workers/verifier/tests

if command -v tofu >/dev/null 2>&1; then
  tofu -chdir=infrastructure/opentofu fmt -check
  tofu -chdir=infrastructure/opentofu validate
else
  echo "warning: OpenTofu is not installed; skipping infrastructure validation" >&2
fi

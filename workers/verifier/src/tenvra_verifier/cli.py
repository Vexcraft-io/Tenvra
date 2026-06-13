"""Command-line entrypoint for the verifier scaffold."""

from __future__ import annotations

import json


def health() -> dict[str, str]:
    """Return non-sensitive scaffold health information."""
    return {
        "service": "tenvra-verifier",
        "stage": "scaffold",
        "status": "ok",
    }


def main() -> None:
    """Print the health result until worker transport is implemented."""
    print(json.dumps(health(), sort_keys=True))


if __name__ == "__main__":
    main()


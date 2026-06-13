from tenvra_verifier.cli import health


def test_health_reports_scaffold_status() -> None:
    assert health() == {
        "service": "tenvra-verifier",
        "stage": "scaffold",
        "status": "ok",
    }


package doctor

import (
	"bytes"
	"strings"
	"testing"
)

func TestRunReportsScaffoldState(t *testing.T) {
	var output bytes.Buffer
	Run(&output)

	if !strings.Contains(output.String(), "gpu=not-probed-in-scaffold") {
		t.Fatalf("expected scaffold GPU status, got %q", output.String())
	}
}


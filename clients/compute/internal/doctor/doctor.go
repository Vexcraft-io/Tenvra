package doctor

import (
	"fmt"
	"io"
	"runtime"
)

// Run reports local runtime facts without probing hardware or changing the host.
func Run(output io.Writer) {
	fmt.Fprintln(output, "Tenvra Compute doctor")
	fmt.Fprintf(output, "os=%s\n", runtime.GOOS)
	fmt.Fprintf(output, "arch=%s\n", runtime.GOARCH)
	fmt.Fprintln(output, "gpu=not-probed-in-scaffold")
	fmt.Fprintln(output, "network=not-tested-in-scaffold")
}


package main

import (
	"fmt"
	"os"

	"github.com/Vexcraft-io/Tenvra/clients/compute/internal/doctor"
)

const version = "0.0.0-scaffold"

func main() {
	command := "help"
	if len(os.Args) > 1 {
		command = os.Args[1]
	}

	switch command {
	case "version":
		fmt.Printf("tenvra-compute %s\n", version)
	case "doctor":
		doctor.Run(os.Stdout)
	default:
		fmt.Println("Tenvra Compute scaffold")
		fmt.Println("usage: tenvra-compute [version|doctor]")
	}
}

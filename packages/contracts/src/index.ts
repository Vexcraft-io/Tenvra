export const protocolVersion = "0.1.0" as const;

export type ComputeBackend = "cuda" | "rocm";
export type JobType = "evaluation" | "lora-training";

export interface JobManifest {
  protocolVersion: typeof protocolVersion;
  jobId: string;
  jobType: JobType;
  backend: ComputeBackend;
  imageDigest: `sha256:${string}`;
  inputHashes: readonly `sha256:${string}`[];
  outputPrefix: string;
  deadline: string;
  resources: {
    minimumVramGb: number;
    diskGb: number;
    networkProfile: "evaluation" | "lora-training";
  };
  networkAllowlist: readonly string[];
  telemetryFields: readonly string[];
  reservedMinimumMinorUnits: number;
  currency: "SEK" | "EUR";
  signature: string;
}

export interface ResultAttestation {
  protocolVersion: typeof protocolVersion;
  jobId: string;
  nodeId: string;
  manifestHash: `sha256:${string}`;
  imageDigest: `sha256:${string}`;
  startedAt: string;
  finishedAt: string;
  exitCode: number;
  artifactHashes: readonly `sha256:${string}`[];
  signature: string;
}

export function isProtocolCompatible(version: string): boolean {
  return version.split(".")[0] === protocolVersion.split(".")[0];
}

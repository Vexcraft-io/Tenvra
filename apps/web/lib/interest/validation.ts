export const interestOptions = [
  "gpu-operator",
  "developer",
  "researcher",
  "design-partner",
] as const;

export const computeBackends = ["cuda", "rocm", "apple-silicon", "unsure"] as const;
export const operatingSystems = ["linux", "windows", "macos"] as const;

export type InterestOption = (typeof interestOptions)[number];
export type ComputeBackend = (typeof computeBackends)[number];
export type OperatingSystem = (typeof operatingSystems)[number];

export interface InterestSubmission {
  email: string;
  displayName: string | null;
  interests: InterestOption[];
  hardware: {
    gpuModel: string | null;
    vramGb: number | null;
    backend: ComputeBackend | null;
    operatingSystem: OperatingSystem | null;
    availabilityHoursPerWeek: number | null;
  } | null;
  network: {
    downloadMbps: number | null;
    uploadMbps: number | null;
  } | null;
  organization: {
    name: string | null;
    teamSize: string | null;
  } | null;
  contributionNote: string | null;
  privacyConsent: true;
  updatesConsent: boolean;
  source: string;
  website: string;
}

export interface ValidationResult {
  data?: InterestSubmission;
  errors?: Record<string, string>;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInterestSubmission(input: unknown): ValidationResult {
  if (!isRecord(input)) {
    return { errors: { form: "The submitted data is invalid." } };
  }

  const errors: Record<string, string> = {};
  const email = readString(input.email, 254).toLowerCase();
  const displayName = nullableString(input.displayName, 80);
  const contributionNote = nullableString(input.contributionNote, 600);
  const source = readString(input.source, 80) || "direct";
  const website = readString(input.website, 200);
  const interests = readEnumArray(input.interests, interestOptions);

  if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (interests.length === 0) {
    errors.interests = "Choose at least one way you may contribute.";
  }
  if (input.privacyConsent !== true) {
    errors.privacyConsent = "Privacy consent is required.";
  }

  const hardware = readHardware(input.hardware, interests.includes("gpu-operator"), errors);
  const network = readNetwork(input.network, interests.includes("gpu-operator"), errors);
  const organization = readOrganization(input.organization);

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: {
      email,
      displayName,
      interests,
      hardware,
      network,
      organization,
      contributionNote,
      privacyConsent: true,
      updatesConsent: input.updatesConsent === true,
      source,
      website,
    },
  };
}

function readHardware(
  input: unknown,
  required: boolean,
  errors: Record<string, string>,
): InterestSubmission["hardware"] {
  const value = isRecord(input) ? input : {};
  const gpuModel = nullableString(value.gpuModel, 120);
  const vramGb = nullableNumber(value.vramGb, 1, 512);
  const availabilityHoursPerWeek = nullableNumber(value.availabilityHoursPerWeek, 1, 168);
  const backend = readEnum(value.backend, computeBackends);
  const operatingSystem = readEnum(value.operatingSystem, operatingSystems);

  if (required && !gpuModel) errors.gpuModel = "Enter your GPU model.";
  if (required && vramGb === null) errors.vramGb = "Enter available VRAM.";
  if (required && !backend) errors.backend = "Choose a compute backend.";
  if (required && !operatingSystem) errors.operatingSystem = "Choose an operating system.";
  if (required && availabilityHoursPerWeek === null) {
    errors.availabilityHoursPerWeek = "Enter expected weekly availability.";
  }

  if (!required && !gpuModel && vramGb === null && !backend && !operatingSystem) {
    return null;
  }

  return { gpuModel, vramGb, backend, operatingSystem, availabilityHoursPerWeek };
}

function readNetwork(
  input: unknown,
  required: boolean,
  errors: Record<string, string>,
): InterestSubmission["network"] {
  const value = isRecord(input) ? input : {};
  const downloadMbps = nullableNumber(value.downloadMbps, 1, 100_000);
  const uploadMbps = nullableNumber(value.uploadMbps, 1, 100_000);

  if (required && downloadMbps === null) errors.downloadMbps = "Enter download speed.";
  if (required && uploadMbps === null) errors.uploadMbps = "Enter upload speed.";

  if (!required && downloadMbps === null && uploadMbps === null) {
    return null;
  }

  return { downloadMbps, uploadMbps };
}

function readOrganization(input: unknown): InterestSubmission["organization"] {
  if (!isRecord(input)) return null;
  const name = nullableString(input.name, 120);
  const teamSize = nullableString(input.teamSize, 40);
  return name || teamSize ? { name, teamSize } : null;
}

function readString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function nullableString(value: unknown, maxLength: number): string | null {
  return readString(value, maxLength) || null;
}

function nullableNumber(value: unknown, minimum: number, maximum: number): number | null {
  if (value === "" || value === null || value === undefined) return null;
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number >= minimum && number <= maximum ? number : null;
}

function readEnum<T extends string>(value: unknown, allowed: readonly T[]): T | null {
  return typeof value === "string" && allowed.includes(value as T) ? (value as T) : null;
}

function readEnumArray<T extends string>(value: unknown, allowed: readonly T[]): T[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((item): item is T => readEnum(item, allowed) !== null))];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

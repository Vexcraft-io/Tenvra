"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | {
      status: "success";
      message: string;
      mode: "preview" | "local" | "email";
      development?: { verificationUrl: string; deletionUrl: string };
    }
  | { status: "error"; message: string; errors: Record<string, string> };

const interestChoices = [
  {
    value: "gpu-operator",
    title: "Run compute",
    description: "Contribute compatible NVIDIA, AMD, or Apple Silicon hardware.",
  },
  {
    value: "developer",
    title: "Build software",
    description: "Work on clients, infrastructure, APIs, security, or the web platform.",
  },
  {
    value: "researcher",
    title: "Research and evaluate",
    description: "Help with datasets, training methods, benchmarks, and model safety.",
  },
  {
    value: "design-partner",
    title: "Use the future API",
    description: "Represent a software team interested in a transparent coding-model service.",
  },
] as const;

export function InterestForm() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [state, setState] = useState<SubmissionState>({ status: "idle" });
  const isGpuOperator = selectedInterests.includes("gpu-operator");
  const isDesignPartner = selectedInterests.includes("design-partner");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      email: formData.get("email"),
      displayName: formData.get("displayName"),
      interests: formData.getAll("interests"),
      hardware: {
        gpuModel: formData.get("gpuModel"),
        vramGb: formData.get("vramGb"),
        backend: formData.get("backend"),
        operatingSystem: formData.get("operatingSystem"),
        availabilityHoursPerWeek: formData.get("availabilityHoursPerWeek"),
      },
      network: {
        downloadMbps: formData.get("downloadMbps"),
        uploadMbps: formData.get("uploadMbps"),
      },
      organization: {
        name: formData.get("organizationName"),
        teamSize: formData.get("teamSize"),
      },
      contributionNote: formData.get("contributionNote"),
      privacyConsent: formData.get("privacyConsent") === "on",
      updatesConsent: formData.get("updatesConsent") === "on",
      source: "tenvra.ai",
      website: formData.get("website"),
    };

    try {
      const response = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        message?: string;
        mode?: string;
        development?: { verificationUrl: string; deletionUrl: string };
        errors?: Record<string, string>;
      };

      if (!response.ok) {
        setState({
          status: "error",
          message: result.message ?? "The registration could not be submitted.",
          errors: result.errors ?? {},
        });
        return;
      }

      form.reset();
      setSelectedInterests([]);
      setState({
        status: "success",
        message: result.message ?? "Your registration was received.",
        mode: result.mode === "preview" ? "preview" : result.mode === "local" ? "local" : "email",
        development: result.development,
      });
    } catch {
      setState({
        status: "error",
        message: "The registration service could not be reached. Please try again.",
        errors: {},
      });
    }
  }

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <span className="success-mark" aria-hidden="true">
          ✓
        </span>
        <p className="eyebrow">
          {state.mode === "preview" ? "Local preview" : "Registration received"}
        </p>
        <h2>{state.mode === "preview" ? "The form works." : "One more step."}</h2>
        <p>{state.message}</p>
        {state.mode === "preview" && (
          <p className="privacy-note">
            Preview mode deliberately stores no personal information. Configure the Phase 1 services
            before accepting real registrations.
          </p>
        )}
        {state.mode === "local" && state.development && (
          <div className="development-links">
            <p className="privacy-note">
              Development only. Production sends these links by email and never returns them from
              the API.
            </p>
            <a className="primary-link" href={state.development.verificationUrl}>
              Verify local registration
            </a>
            <a className="secondary-link" href={state.development.deletionUrl}>
              Open deletion controls
            </a>
          </div>
        )}
        <button className="secondary-button" onClick={() => setState({ status: "idle" })}>
          Submit another response
        </button>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};
  const finalStep =
    isGpuOperator && isDesignPartner ? "05" : isGpuOperator || isDesignPartner ? "04" : "03";

  return (
    <form className="interest-form" onSubmit={submit} noValidate>
      {state.status === "error" && (
        <div className="form-error" role="alert">
          {state.message}
        </div>
      )}

      <fieldset>
        <legend>
          <span>01</span>
          How would you take part?
        </legend>
        <p className="field-help">Choose every option that applies.</p>
        <div className="choice-grid">
          {interestChoices.map((choice) => (
            <label className="choice-card" key={choice.value}>
              <input
                type="checkbox"
                name="interests"
                value={choice.value}
                onChange={(event) => {
                  setSelectedInterests((current) =>
                    event.target.checked
                      ? [...current, choice.value]
                      : current.filter((item) => item !== choice.value),
                  );
                }}
              />
              <span className="choice-copy">
                <strong>{choice.title}</strong>
                <small>{choice.description}</small>
              </span>
            </label>
          ))}
        </div>
        <FieldError message={errors.interests} />
      </fieldset>

      <fieldset>
        <legend>
          <span>02</span>
          About you
        </legend>
        <div className="field-grid">
          <Field label="Email address" name="email" type="email" required error={errors.email} />
          <Field label="Name or alias" name="displayName" autoComplete="name" />
        </div>
      </fieldset>

      {isGpuOperator && (
        <fieldset className="conditional-section">
          <legend>
            <span>03</span>
            Compute capability
          </legend>
          <p className="field-help">
            Self-reported details help us plan the pilot. They do not guarantee acceptance or
            payment.
          </p>
          <div className="field-grid">
            <Field
              label="GPU model"
              name="gpuModel"
              placeholder="e.g. Radeon RX 7900 XTX"
              required
              error={errors.gpuModel}
            />
            <Field
              label="VRAM (GB)"
              name="vramGb"
              type="number"
              min="1"
              max="512"
              required
              error={errors.vramGb}
            />
            <SelectField
              label="Compute backend"
              name="backend"
              required
              error={errors.backend}
              options={[
                ["", "Select backend"],
                ["cuda", "NVIDIA / CUDA"],
                ["rocm", "AMD / ROCm"],
                ["apple-silicon", "Apple Silicon"],
                ["unsure", "Not sure"],
              ]}
            />
            <SelectField
              label="Operating system"
              name="operatingSystem"
              required
              error={errors.operatingSystem}
              options={[
                ["", "Select operating system"],
                ["linux", "Linux"],
                ["windows", "Windows"],
                ["macos", "macOS"],
              ]}
            />
            <Field
              label="Available hours per week"
              name="availabilityHoursPerWeek"
              type="number"
              min="1"
              max="168"
              required
              error={errors.availabilityHoursPerWeek}
            />
          </div>
          <div className="network-fields">
            <Field
              label="Download speed (Mbps)"
              name="downloadMbps"
              type="number"
              min="1"
              max="100000"
              required
              error={errors.downloadMbps}
            />
            <Field
              label="Upload speed (Mbps)"
              name="uploadMbps"
              type="number"
              min="1"
              max="100000"
              required
              error={errors.uploadMbps}
            />
          </div>
        </fieldset>
      )}

      {isDesignPartner && (
        <fieldset className="conditional-section">
          <legend>
            <span>{isGpuOperator ? "04" : "03"}</span>
            Your organization
          </legend>
          <div className="field-grid">
            <Field label="Organization" name="organizationName" autoComplete="organization" />
            <SelectField
              label="Engineering team size"
              name="teamSize"
              options={[
                ["", "Select team size"],
                ["1", "1"],
                ["2-10", "2–10"],
                ["11-50", "11–50"],
                ["51-200", "51–200"],
                ["201+", "201+"],
              ]}
            />
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend>
          <span>{finalStep}</span>
          Anything else?
        </legend>
        <label className="field">
          <span>Relevant experience or what you want from Tenvra</span>
          <textarea name="contributionNote" maxLength={600} rows={5} />
        </label>
      </fieldset>

      <div className="consent-block">
        <label className="consent-row">
          <input type="checkbox" name="privacyConsent" required />
          <span>
            I have read the <Link href="/privacy">privacy notice</Link> and consent to Tenvra using
            this information to evaluate project interest and pilot suitability.
          </span>
        </label>
        <FieldError message={errors.privacyConsent} />
        <label className="consent-row">
          <input type="checkbox" name="updatesConsent" />
          <span>I want occasional project updates. This is optional.</span>
        </label>
      </div>

      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button className="submit-button" type="submit" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Submitting…" : "Register interest"}
      </button>
      <p className="submission-note">
        Registration is not an investment, employment offer, compute contract, or promise of
        payment.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  ...inputProps
}: {
  label: string;
  name: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} aria-invalid={Boolean(error)} {...inputProps} />
      <FieldError message={error} />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
  required,
}: {
  label: string;
  name: string;
  options: [string, string][];
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} required={required} aria-invalid={Boolean(error)}>
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  return message ? <small className="field-error">{message}</small> : null;
}

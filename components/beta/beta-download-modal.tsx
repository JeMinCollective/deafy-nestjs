"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { getBetaApkHref } from "@/lib/config/beta-apk";
import { isValidEmail } from "@/lib/utils/validate-email";

const NAME_MAX = 100;

type BetaDownloadModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FieldTouch = {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
};

export function BetaDownloadModal({ open, onOpenChange }: BetaDownloadModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState<FieldTouch>({
    firstName: false,
    lastName: false,
    email: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const submittedRef = useRef(false);
  const firstNameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open || success) return;
    const t = window.setTimeout(() => firstNameInputRef.current?.focus(), 50);
    return () => window.clearTimeout(t);
  }, [open, success]);

  const firstNameError =
    touched.firstName && !firstName.trim()
      ? "First name is required"
      : touched.firstName && firstName.trim().length > NAME_MAX
        ? "First name is too long"
        : undefined;

  const lastNameError =
    touched.lastName && !lastName.trim()
      ? "Last name is required"
      : touched.lastName && lastName.trim().length > NAME_MAX
        ? "Last name is too long"
        : undefined;

  const emailError =
    touched.email && !email.trim()
      ? "Email is required"
      : touched.email && email.trim() && !isValidEmail(email)
        ? "Enter a valid email address"
        : undefined;

  const reset = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setTouched({ firstName: false, lastName: false, email: false });
    setSubmitting(false);
    setSuccess(false);
    setServerError(null);
    submittedRef.current = false;
  }, []);

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      reset();
    }
    onOpenChange(next);
  };

  function markAllTouched() {
    setTouched({ firstName: true, lastName: true, email: true });
  }

  function isFormValid(): boolean {
    const fn = firstName.trim();
    const ln = lastName.trim();
    const em = email.trim();
    return (
      fn.length > 0 &&
      fn.length <= NAME_MAX &&
      ln.length > 0 &&
      ln.length <= NAME_MAX &&
      em.length > 0 &&
      isValidEmail(em)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    markAllTouched();
    setServerError(null);

    if (!isFormValid()) {
      return;
    }

    if (submitting || success || submittedRef.current) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
      };

      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong. Try again.");
        console.warn("[beta register] failed", res.status, data);
        return;
      }

      submittedRef.current = true;
      setSuccess(true);
      console.log("[analytics] beta_signup", { email: email.trim() });

      window.setTimeout(() => {
        handleOpenChange(false);
      }, 1800);
    } catch {
      setServerError("Network error. Check your connection and try again.");
      console.warn("[beta register] network error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="Get the Deafy beta"
      description="Enter your name and email and we’ll send you download instructions and updates."
    >
      {success ? (
        <div
          className="bg-primary/10 text-foreground space-y-3 rounded-xl border border-primary/20 px-4 py-3 text-sm"
          role="status"
        >
          <p>
            You’re on the list. Check your inbox soon—this window will close
            automatically.
          </p>
          <p className="text-muted-foreground">
            Prefer to grab the file now?{" "}
            <a
              href={getBetaApkHref()}
              className="text-primary font-medium underline-offset-2 hover:underline"
            >
              Download the beta APK
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <InputField
            ref={firstNameInputRef}
            label="First Name"
            name="given-name"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() =>
              setTouched((t) => ({ ...t, firstName: true }))
            }
            disabled={submitting}
            placeholder="Ada"
            maxLength={NAME_MAX}
            error={firstNameError}
          />

          <InputField
            label="Last Name"
            name="family-name"
            type="text"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() =>
              setTouched((t) => ({ ...t, lastName: true }))
            }
            disabled={submitting}
            placeholder="Lovelace"
            maxLength={NAME_MAX}
            error={lastNameError}
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            disabled={submitting}
            placeholder="you@example.com"
            error={emailError}
          />

          {serverError ? (
            <p className="text-destructive text-sm" role="alert">
              {serverError}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

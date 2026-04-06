import { isValidEmail } from "@/lib/utils/validate-email";
import { getBackendRegisterUrl } from "@/lib/config/backend";
import { NextResponse } from "next/server";

const NAME_MAX = 100;

function readStringField(body: unknown, key: string): string {
  if (typeof body !== "object" || body === null || !(key in body)) {
    return "";
  }
  const v = (body as Record<string, unknown>)[key];
  return typeof v === "string" ? v.trim() : "";
}

function errorMessageFromUpstreamBody(data: unknown): unknown {
  if (typeof data !== "object" || data === null) {
    return null;
  }
  const msg = (data as Record<string, unknown>).message;
  if (typeof msg === "string") {
    return msg;
  }
  if (Array.isArray(msg)) {
    return msg
      .filter((m): m is string => typeof m === "string")
      .join(", ");
  }
  return null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const firstName = readStringField(body, "firstName");
  const lastName = readStringField(body, "lastName");
  const email = readStringField(body, "email");

  if (!firstName) {
    return NextResponse.json(
      { error: "First name is required" },
      { status: 400 },
    );
  }
  if (firstName.length > NAME_MAX) {
    return NextResponse.json(
      { error: "First name is too long" },
      { status: 400 },
    );
  }

  if (!lastName) {
    return NextResponse.json(
      { error: "Last name is required" },
      { status: 400 },
    );
  }
  if (lastName.length > NAME_MAX) {
    return NextResponse.json(
      { error: "Last name is too long" },
      { status: 400 },
    );
  }

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 },
    );
  }

  const registerUrl = getBackendRegisterUrl();
  if (!registerUrl) {
    console.error("[api/register] DEAFY_BACKEND_URL is not set");
    return NextResponse.json(
      {
        error:
          "Registration is temporarily unavailable. Please try again later.",
      },
      { status: 503 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(registerUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email: email.toLowerCase(),
      }),
      cache: "no-store",
    });
  } catch (e) {
    console.error("[api/register] upstream fetch failed", e);
    return NextResponse.json(
      { error: "Could not reach registration service. Is the backend running?" },
      { status: 502 },
    );
  }

  const raw = await upstream.text();
  let parsed: unknown = null;
  if (raw) {
    try {
      parsed = JSON.parse(raw) as unknown;
    } catch {
      parsed = null;
    }
  }

  if (!upstream.ok) {
    const fallback = "Registration failed. Please try again.";
    const fromBody = errorMessageFromUpstreamBody(parsed);
    const message =
      typeof fromBody === "string" && fromBody.trim()
        ? fromBody
        : fallback;

    console.warn("[api/register] upstream error", upstream.status, message);

    return NextResponse.json(
      { error: message },
      {
        status:
          upstream.status >= 400 && upstream.status < 600
            ? upstream.status
            : 502,
      },
    );
  }

  console.log("[api/register] forwarded OK", {
    email,
    upstreamStatus: upstream.status,
  });

  return NextResponse.json({
    ok: true,
    message: "Registered successfully",
  });
}

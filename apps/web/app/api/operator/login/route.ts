import { NextResponse } from "next/server";

import {
  createOperatorSession,
  operatorAuthConfigured,
  operatorCookieName,
  operatorCookieOptions,
  requestHasTrustedOrigin,
  verifyOperatorAccessToken,
} from "../../../../lib/operator/session";

export async function POST(request: Request) {
  if (!requestHasTrustedOrigin(request)) {
    return Response.json({ message: "Invalid request origin." }, { status: 403 });
  }
  if (!operatorAuthConfigured()) {
    return Response.json({ message: "Operator access is not configured." }, { status: 503 });
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ message: "Invalid login request." }, { status: 400 });
  }

  const token =
    typeof input === "object" && input !== null && "token" in input ? input.token : null;
  if (!verifyOperatorAccessToken(token)) {
    return Response.json({ message: "Invalid operator token." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(operatorCookieName, createOperatorSession(), operatorCookieOptions());
  return response;
}

import { NextResponse } from "next/server";

import {
  operatorCookieName,
  operatorCookieOptions,
  requestHasTrustedOrigin,
} from "../../../../lib/operator/session";

export async function POST(request: Request) {
  if (!requestHasTrustedOrigin(request)) {
    return Response.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(operatorCookieName, "", {
    ...operatorCookieOptions(),
    maxAge: 0,
  });
  return response;
}

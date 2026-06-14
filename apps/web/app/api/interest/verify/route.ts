import { NextResponse } from "next/server";

import { verifyRegistration } from "../../../../lib/interest/repository";
import { hashToken, isValidToken } from "../../../../lib/interest/security";
import { isSupabaseConfigured } from "../../../../lib/interest/supabase";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get("token");
  const destination = new URL("/interest", requestUrl.origin);

  if (!isValidToken(token) || !isSupabaseConfigured()) {
    destination.searchParams.set("verification", "invalid");
    return NextResponse.redirect(destination);
  }

  try {
    const verified = await verifyRegistration(hashToken(token));
    destination.searchParams.set("verification", verified ? "success" : "invalid");
  } catch (error) {
    console.error("Interest verification failed", error);
    destination.searchParams.set("verification", "error");
  }

  return NextResponse.redirect(destination);
}

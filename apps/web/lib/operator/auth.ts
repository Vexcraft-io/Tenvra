import "server-only";

import { cookies } from "next/headers";

import { operatorCookieName, readOperatorSession } from "./session";

export async function getOperatorSession() {
  const cookieStore = await cookies();
  return readOperatorSession(cookieStore.get(operatorCookieName)?.value);
}

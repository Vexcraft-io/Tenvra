import { deleteRegistration } from "../../../../lib/interest/repository";
import { hashToken, isValidToken } from "../../../../lib/interest/security";
import { isSupabaseConfigured } from "../../../../lib/interest/supabase";

export async function DELETE(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ message: "The deletion request is invalid." }, { status: 400 });
  }

  const token =
    typeof input === "object" && input !== null && "token" in input ? input.token : null;

  if (!isValidToken(token)) {
    return Response.json({ message: "The deletion link is invalid." }, { status: 400 });
  }
  if (!isSupabaseConfigured()) {
    return Response.json(
      { message: "The registration service is not configured." },
      { status: 503 },
    );
  }

  try {
    // The same response is returned for missing and deleted records to avoid token probing.
    await deleteRegistration(hashToken(token));
    return Response.json({
      message: "Your Tenvra interest registration has been deleted.",
    });
  } catch (error) {
    console.error("Interest deletion failed", error);
    return Response.json(
      { message: "Deletion is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
}

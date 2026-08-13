import { NextResponse } from "next/server";
import { authenticateUser, sanitizeUser } from "@/lib/user-store";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Return user without password
    return NextResponse.json({ ok: true, user: sanitizeUser(user) });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

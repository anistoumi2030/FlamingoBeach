import { NextResponse } from "next/server";
import { createUser, sanitizeUser } from "@/lib/user-store";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { ok: false, error: "Nom, email et mot de passe requis" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Le mot de passe doit contenir au moins 6 caractères" },
        { status: 400 }
      );
    }

    try {
      const newUser = await createUser(name, email, password);
      return NextResponse.json({ ok: true, user: sanitizeUser(newUser) });
    } catch (err: any) {
      if (err.message === "User already exists") {
        return NextResponse.json(
          { ok: false, error: "Un compte existe déjà avec cet email" },
          { status: 409 }
        );
      }
      throw err;
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

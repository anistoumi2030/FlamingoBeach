import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const usersFile = join(process.cwd(), "data", "users.json");

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    if (!existsSync(usersFile)) {
      return NextResponse.json(
        { ok: false, error: "Aucun utilisateur enregistré" },
        { status: 401 }
      );
    }

    const users = JSON.parse(readFileSync(usersFile, "utf-8"));
    const user = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json(
        { ok: false, error: "Email ou mot de passe incorrect" },
        { status: 401 }
      );
    }

    // Return user without password
    const { password: _password, ...safeUser } = user;
    return NextResponse.json({ ok: true, user: safeUser });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

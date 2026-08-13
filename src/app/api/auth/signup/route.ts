import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const usersFile = join(process.cwd(), "data", "users.json");

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

    let users: any[] = [];
    if (existsSync(usersFile)) {
      users = JSON.parse(readFileSync(usersFile, "utf-8"));
    }

    const existingUser = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return NextResponse.json(
        { ok: false, error: "Un compte existe déjà avec cet email" },
        { status: 409 }
      );
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeFileSync(usersFile, JSON.stringify(users, null, 2));

    const { password: _password, ...safeUser } = newUser;
    return NextResponse.json({ ok: true, user: safeUser });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

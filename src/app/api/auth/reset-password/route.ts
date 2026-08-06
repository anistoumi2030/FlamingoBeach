import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const usersFile = join(process.cwd(), "data", "users.json");
const resetTokensFile = join(process.cwd(), "data", "reset-tokens.json");

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json({ ok: false, error: "Token et nouveau mot de passe requis" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ ok: false, error: "Le mot de passe doit contenir au moins 6 caractères" }, { status: 400 });
    }

    if (!existsSync(resetTokensFile)) {
      return NextResponse.json({ ok: false, error: "Token invalide ou expiré" }, { status: 400 });
    }

    const tokens = JSON.parse(readFileSync(resetTokensFile, "utf-8"));
    const tokenData = tokens[token];

    if (!tokenData) {
      return NextResponse.json({ ok: false, error: "Token invalide ou expiré" }, { status: 400 });
    }

    if (new Date(tokenData.expires) < new Date()) {
      delete tokens[token];
      writeFileSync(resetTokensFile, JSON.stringify(tokens, null, 2));
      return NextResponse.json({ ok: false, error: "Token expiré. Veuillez refaire une demande." }, { status: 400 });
    }

    if (!existsSync(usersFile)) {
      return NextResponse.json({ ok: false, error: "Erreur interne" }, { status: 500 });
    }

    const users = JSON.parse(readFileSync(usersFile, "utf-8"));
    const userIndex = users.findIndex((u: any) => u.email.toLowerCase() === tokenData.email.toLowerCase());

    if (userIndex === -1) {
      return NextResponse.json({ ok: false, error: "Utilisateur introuvable" }, { status: 404 });
    }

    users[userIndex].password = newPassword;
    writeFileSync(usersFile, JSON.stringify(users, null, 2));

    delete tokens[token];
    writeFileSync(resetTokensFile, JSON.stringify(tokens, null, 2));

    return NextResponse.json({ ok: true, message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ ok: false, error: "Erreur interne" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import nodemailer from "nodemailer";
import { findUserByEmail } from "@/lib/user-store";

const resetTokensFile = join(process.cwd(), "data", "reset-tokens.json");

function getResetTokens(): Record<string, { email: string; expires: string }> {
  if (!existsSync(resetTokensFile)) {
    writeFileSync(resetTokensFile, JSON.stringify({}));
    return {};
  }
  return JSON.parse(readFileSync(resetTokensFile, "utf-8"));
}

function saveResetTokens(tokens: Record<string, { email: string; expires: string }>) {
  writeFileSync(resetTokensFile, JSON.stringify(tokens, null, 2));
}

function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0MOT_DE_PASSE_EN_CLAIR789";
  let token = "";
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ ok: false, error: "Email requis" }, { status: 400 });
    }

    // Check if user exists (works with both Supabase and file storage)
    const user = await findUserByEmail(email);

    if (!user) {
      // Return same message for security (don't reveal if email exists)
      return NextResponse.json({ ok: true, message: "Si cet email existe, un lien de réinitialisation a été envoyé." });
    }

    const token = generateToken();
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    const tokens = getResetTokens();
    tokens[token] = { email: user.email, expires };
    saveResetTokens(tokens);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/auth?mode=login&resetToken=${token}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `Coucou Beach <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Réinitialisation de votre mot de passe - Coucou Beach",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a365d, #2563eb); padding: 20px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Coucou Beach</h1>
          </div>
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
            <h2 style="color: #1a365d; margin-top: 0;">Réinitialisation de mot de passe</h2>
            <p style="color: #4b5563; line-height: 1.6;">Bonjour ${user.name || "Cher utilisateur"},</p>
            <p style="color: #4b5563; line-height: 1.6;">Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background: #059669; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">Réinitialiser mon mot de passe</a>
            </div>
            <p style="color: #4b5563; line-height: 1.6;">Ce lien expire dans 1 heure.</p>
            <p style="color: #4b5563; line-height: 1.6;">Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
            <p style="color: #9ca3af; font-size: 12px; text-align: center;">Coucou Beach - Réservation de plages privées en Tunisie</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, message: "Si cet email existe, un lien de réinitialisation a été envoyé." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ ok: false, error: "Erreur lors de l'envoi de l'email" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { findUserByEmail } from "@/lib/user-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, guests, listing } = body;

    // Vérifier que l'utilisateur est connecté
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { ok: false, error: "Authentification requise pour effectuer une réservation" },
        { status: 401 }
      );
    }

    const tokenEmail = authHeader.replace("Bearer ", "").trim();

    if (!tokenEmail) {
      return NextResponse.json(
        { ok: false, error: "Session invalide" },
        { status: 401 }
      );
    }

    // Verify user via Supabase or file storage
    const user = await findUserByEmail(tokenEmail);

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Session invalide" },
        { status: 401 }
      );
    }

    const content = `Nouvelle réservation sur CoucouBeach :

Nom complet : ${name}
Adresse email : ${email}
Numéro de téléphone : ${phone || ""}
Hébergement : ${listing?.title || ""}
Date : ${date}
Personnes : ${guests}
Prix par adulte : ${listing?.price ?? 0} TND
Total : ${(listing?.price ?? 0) * Number(guests)} TND
Localisation : ${listing?.location || ""}
Type : ${listing?.type || ""}`;

    console.log("[BOOKING EMAIL]", content);

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || smtpUser,
        to: "EMAIL_PROPRIÉTAIRE_(PRIVÉ)",
        subject: `Nouvelle réservation - ${listing?.title || ""} - ${date}`,
        text: content,
      });
    }

    return NextResponse.json({ ok: true, message: "Réservation enregistrée" });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

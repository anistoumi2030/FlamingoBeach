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

    // Email est obligatoire - si SMTP non configuré, renvoyer une erreur claire
    if (!smtpUser || !smtpPass) {
      console.error("[BOOKING EMAIL] SMTP non configuré - SMTP_USER ou SMTP_PASS manquant");
      return NextResponse.json(
        { ok: false, error: "Configuration email manquante sur le serveur" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      auth: { user: smtpUser, pass: smtpPass },
    });

    // Email de notification au propriétaire (best-effort, ne bloque pas la réservation)
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || smtpUser,
        to: "EMAIL_PROPRIÉTAIRE_(PRIVÉ)",
        subject: `Nouvelle réservation - ${listing?.title || ""} - ${date}`,
        text: content,
      });
      console.log("[BOOKING EMAIL] Email au propriétaire envoyé avec succès");
    } catch (mailError) {
      console.error("[BOOKING EMAIL] Erreur d'envoi au propriétaire (non bloquant):", mailError);
    }

    // Email de confirmation au client (best-effort, ne bloque pas la réservation)
    const clientContent = `Bonjour ${name},

Votre réservation sur CoucouBeach a bien été enregistrée. Voici le récapitulatif :

Hébergement : ${listing?.title || ""}
Localisation : ${listing?.location || ""}
Type : ${listing?.type || ""}
Date : ${date}
Personnes : ${guests}
Prix par adulte : ${listing?.price ?? 0} TND
Total : ${(listing?.price ?? 0) * Number(guests)} TND

Merci de votre confiance !
L'équipe CoucouBeach`;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || smtpUser,
        to: email,
        subject: `Confirmation de réservation - ${listing?.title || ""} - ${date}`,
        text: clientContent,
      });
      console.log("[BOOKING EMAIL] Email de confirmation au client envoyé avec succès");
    } catch (mailError) {
      console.error("[BOOKING EMAIL] Erreur d'envoi au client (non bloquant):", mailError);
    }

    return NextResponse.json({ ok: true, message: "Réservation enregistrée" });
  } catch (error) {
    console.error("[BOOKING] Erreur:", error);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

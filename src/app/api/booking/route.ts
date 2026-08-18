import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { findUserByEmail } from "@/lib/user-store";

/**
 * Envoie un email par le biais d'une API HTTPS (Resend, Brevo, etc.)
 * Ces API utilisent le port 443 qui n'est pas bloqué, contrairement au SMTP.
 */
async function sendEmailViaHttpApi(
  to: string,
  subject: string,
  text: string
): Promise<boolean> {
  // Méthode 1 : Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "onboarding@resend.dev",
          to: [to],
          subject,
          text,
        }),
      });
      if (res.ok) {
        console.log(`[BOOKING EMAIL] Email envoyé via Resend → ${to}`);
        return true;
      }
      console.error(
        "[BOOKING EMAIL] Resend échec:",
        res.status,
        await res.text()
      );
    } catch (e) {
      console.error("[BOOKING EMAIL] Resend erreur:", e);
    }
  }

  // Méthode 2 : Brevo (Sendinblue)
  const brevoKey = process.env.BREVO_API_KEY;
  if (brevoKey) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": brevoKey,
        },
        body: JSON.stringify({
          sender: {
            name: "Coucou Beach",
            email: process.env.EMAIL_FROM || "EMAIL_SMTP_(PRIVÉ)",
          },
          to: [{ email: to }],
          subject,
          textContent: text,
        }),
      });
      if (res.ok) {
        console.log(`[BOOKING EMAIL] Email envoyé via Brevo → ${to}`);
        return true;
      }
      console.error(
        "[BOOKING EMAIL] Brevo échec:",
        res.status,
        await res.text()
      );
    } catch (e) {
      console.error("[BOOKING EMAIL] Brevo erreur:", e);
    }
  }

  // Méthode 3 : SendGrid
  const sendgridKey = process.env.SENDGRID_API_KEY;
  if (sendgridKey) {
    try {
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sendgridKey}`,
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: {
            email: process.env.EMAIL_FROM || "EMAIL_SMTP_(PRIVÉ)",
            name: "Coucou Beach",
          },
          subject,
          content: [{ type: "text/plain", value: text }],
        }),
      });
      if (res.ok) {
        console.log(`[BOOKING EMAIL] Email envoyé via SendGrid → ${to}`);
        return true;
      }
      console.error(
        "[BOOKING EMAIL] SendGrid échec:",
        res.status,
        await res.text()
      );
    } catch (e) {
      console.error("[BOOKING EMAIL] SendGrid erreur:", e);
    }
  }

  return false;
}

/**
 * Envoie un email par SMTP Gmail (utile quand le déploiement a un accès SMTP).
 */
async function sendEmailViaSmtp(
  to: string,
  subject: string,
  content: string
): Promise<boolean> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) return false;

  try {
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

    await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpUser,
      to,
      subject,
      text: content,
    });
    console.log(`[BOOKING EMAIL] Email envoyé via SMTP → ${to}`);
    return true;
  } catch (mailError) {
    console.error("[BOOKING EMAIL] SMTP erreur (non bloquant):", mailError);
    return false;
  }
}

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

    const ownerEmail = process.env.OWNER_EMAIL || "EMAIL_PROPRIÉTAIRE_(PRIVÉ)";

    // Email de notification au propriétaire — Resend en premier (rapide, timeout court)
    const ownerSent = await sendEmailViaHttpApi(
      ownerEmail,
      `Nouvelle réservation - ${listing?.title || ""} - ${date}`,
      content
    );

    // Email de confirmation au client
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

    const clientSent = await sendEmailViaHttpApi(
      email,
      `Confirmation de réservation - ${listing?.title || ""} - ${date}`,
      clientContent
    );

    return NextResponse.json({
      ok: true,
      message: "Réservation enregistrée",
      emailsSent: {
        owner: ownerSent,
        client: clientSent,
      },
    });
  } catch (error) {
    console.error("[BOOKING] Erreur:", error);
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
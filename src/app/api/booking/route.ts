import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { findUserByEmail } from "@/lib/user-store";

/**
 * Génère le template HTML au format "Fiche Réservation"
 * (uniquement les informations saisies par l'utilisateur).
 */
function buildBookingSheetHtml(data: {
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  arrival: string;
  listingTitle: string;
  guests: string;
  pricePerAdult: number;
  total: number;
}): string {
  const row = (label: string, value: string) => `
      <tr>
        <td style="padding:10px 14px;border:1px solid #d1d5db;color:#1f2937;font-weight:bold;font-size:13px;width:45%;text-align:left;">${label}</td>
        <td style="padding:10px 14px;border:1px solid #d1d5db;color:#111827;font-size:13px;">${value || "&nbsp;"}</td>
      </tr>`;

  const sectionHeader = (title: string, bg: string) => `
      <tr>
        <td colspan="2" style="padding:12px 14px;background:${bg};color:#ffffff;font-weight:bold;font-size:15px;letter-spacing:0.5px;text-align:center;">${title}</td>
      </tr>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:24px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;">
    <!-- En-tête -->
    <tr>
      <td style="padding:20px 24px;border-bottom:3px solid #f97316;text-align:center;">
        <span style="font-size:22px;font-weight:bold;color:#1f2937;letter-spacing:1px;">FICHE RÉSERVATION</span>
      </td>
    </tr>
    <!-- Client -->
    <tr>
      <td style="padding:16px 24px 16px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${sectionHeader("CLIENT", "#f05a28")}
          ${row("NOM ET PRÉNOM", data.clientName)}
          ${row("TÉLÉPHONE", data.clientPhone)}
          ${row("E-MAIL", data.clientEmail)}
        </table>
      </td>
    </tr>
    <!-- Détails réservation -->
    <tr>
      <td style="padding:0 24px 24px 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${sectionHeader("DÉTAILS DE LA RÉSERVATION", "#1e3a5f")}
          ${row("DATE", data.arrival)}
          ${row("HÉBERGEMENT", data.listingTitle)}
          ${row("NOMBRE DE PERSONNES", data.guests)}
          ${row("PRIX PAR ADULTE", `${data.pricePerAdult} TND`)}
          ${row("TOTAL", `<strong>${data.total} TND</strong>`)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:14px 24px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;color:#6b7280;font-size:12px;">
        Merci de votre confiance — L'équipe CoucouBeach
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Envoie un email par le biais d'une API HTTPS (Resend, Brevo, etc.)
 * Ces API utilisent le port 443 qui n'est pas bloqué, contrairement au SMTP.
 */
async function sendEmailViaHttpApi(
  to: string,
  subject: string,
  text: string,
  html?: string
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
          ...(html ? { html } : {}),
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
            email: process.env.EMAIL_FROM || process.env.SMTP_USER,
          },
          to: [{ email: to }],
          subject,
          textContent: text,
          ...(html ? { htmlContent: html } : {}),
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
            email: process.env.EMAIL_FROM || process.env.SMTP_USER,
            name: "Coucou Beach",
          },
          subject,
          content: [
            { type: "text/plain", value: text },
            ...(html ? [{ type: "text/html", value: html }] : []),
          ],
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
 * Envoie un email par SMTP Gmail (fallback quand les API HTTPS échouent).
 */
async function sendEmailViaSmtp(
  to: string,
  subject: string,
  content: string,
  html?: string
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
      ...(html ? { html } : {}),
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

    const total = (listing?.price ?? 0) * Number(guests);

    const content = `Nouvelle réservation sur CoucouBeach :

Nom complet : ${name}
Adresse email : ${email}
Numéro de téléphone : ${phone || ""}
Hébergement : ${listing?.title || ""}
Date : ${date}
Personnes : ${guests}
Prix par adulte : ${listing?.price ?? 0} TND
Total : ${total} TND
Localisation : ${listing?.location || ""}
Type : ${listing?.type || ""}`;

    console.log("[BOOKING EMAIL]", content);

    // Données de la fiche — uniquement les informations saisies par l'utilisateur
    const sheetData = {
      clientName: name || "",
      clientPhone: phone || "",
      clientEmail: email || "",
      arrival: date || "",
      listingTitle: listing?.title || "",
      guests: String(guests ?? ""),
      pricePerAdult: listing?.price ?? 0,
      total,
    };

    const ownerHtml = buildBookingSheetHtml(sheetData);
    const clientHtml = buildBookingSheetHtml(sheetData);

    const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;

    // Email de notification au propriétaire — API HTTPS puis fallback SMTP
    let ownerSent = await sendEmailViaHttpApi(
      ownerEmail,
      `Nouvelle réservation - ${listing?.title || ""} - ${date}`,
      content,
      ownerHtml
    );
    if (!ownerSent) {
      ownerSent = await sendEmailViaSmtp(
        ownerEmail,
        `Nouvelle réservation - ${listing?.title || ""} - ${date}`,
        content,
        ownerHtml
      );
    }

    // Email de confirmation au client — API HTTPS puis fallback SMTP
    const clientContent = `Bonjour ${name},

Votre réservation sur CoucouBeach a bien été enregistrée. Voici le récapitulatif :

Hébergement : ${listing?.title || ""}
Localisation : ${listing?.location || ""}
Type : ${listing?.type || ""}
Date : ${date}
Personnes : ${guests}
Prix par adulte : ${listing?.price ?? 0} TND
Total : ${total} TND

Merci de votre confiance !
L'équipe CoucouBeach`;

    let clientSent = await sendEmailViaHttpApi(
      email,
      `Confirmation de réservation - ${listing?.title || ""} - ${date}`,
      clientContent,
      clientHtml
    );
    if (!clientSent) {
      clientSent = await sendEmailViaSmtp(
        email,
        `Confirmation de réservation - ${listing?.title || ""} - ${date}`,
        clientContent,
        clientHtml
      );
    }

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
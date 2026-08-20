import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, contactName, email, phone, location, propertyType, units, website, message } = body;

    const content = `Nouvelle demande de partenariat sur CoucouBeach :

Établissement : ${companyName}
Contact : ${contactName}
Email : ${email}
Téléphone : ${phone}
Plage / Localisation : ${location}
Type d'hébergement : ${propertyType}
Nombre d'unités : ${units}
Site web : ${website || "Non fourni"}
Message : ${message || "Aucun message"}`;

    console.log("[PARTNER EMAIL]", content);

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
        to: process.env.OWNER_EMAIL || smtpUser,
        subject: `Nouvelle demande de partenariat - ${companyName}`,
        text: content,
      });
    }

    return NextResponse.json({ ok: true, message: "Demande de partenariat envoyée" });
  } catch (error) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
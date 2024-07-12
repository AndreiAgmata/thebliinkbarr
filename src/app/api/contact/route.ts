import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const user = process.env.NEXT_PUBLIC_ZOHO_EMAIL;
const pass = process.env.NEXT_PUBLIC_ZOHO_PASSWORD;

export async function POST() {
  try {
    const name = "Andrei";
    const email = "agmataa1124@gmail.com";
    const message = "This is a test email.";

    const transporter = nodemailer.createTransport({
      host: "smtp.zohocloud.ca",
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pass,
      },
    });

    const filePath = path.join(
      process.cwd(),
      "emailTemplates",
      "welcomeEmail.html"
    );
    const htmlContent = fs.readFileSync(filePath, "utf8");

    const mailOptions = {
      from: user,
      to: email,
      subject: "Welcome Email",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to send message." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const user = process.env.NEXT_PUBLIC_ZOHO_EMAIL;
const pass = process.env.NEXT_PUBLIC_ZOHO_PASSWORD;

export async function sendOrderConfirmationEmail(
  email: string,
  orderId: string,
  orderNumber: string
) {
  try {
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
      "orderConfirmationEmail.html"
    );
    let htmlContent = fs.readFileSync(filePath, "utf8");
    htmlContent = htmlContent.replace(/{{orderId}}/g, orderId);
    htmlContent = htmlContent.replace(/{{orderNumber}}/g, orderNumber);

    const mailOptions = {
      from: user,
      to: email,
      subject: `Confirmation for Order# ${orderNumber}`,
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

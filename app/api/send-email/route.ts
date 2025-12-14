import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");
require("dotenv").config();

export async function POST(request: Request) {
  const isValidString = (value: any) =>
  typeof value === "string" && value.trim().length > 0;

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const body = await request.json();
  const message = {
    from: `Portfolio Contact ${body.email}`,
    to: process.env.EMAIL_TO,
    subject: "Portfolio",
    html: `
        <p>
        Hello ${body.name}
        </p>
       <p>Email : ${body.email}</p>
        <p>
         Message : ${body.message}
        </p>
        `,
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_TO,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // console.log(JSON.stringify(body))

  try {
  const { name, email, message: userMessage } = body;

  // Validate strings
  if (
    !isValidString(name) ||
    !isValidString(email) ||
    !isValidString(userMessage)
  ) {
    return NextResponse.json(
      { message: "Invalid input: name, email and message are required" },
      { status: 400 }
    );
  }

  // Validate email format
  if (!isValidEmail(email.trim())) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  // Prevent spam / extremely long messages
  if (userMessage.length > 1000) {
    return NextResponse.json(
      { message: "Message is too long" },
      { status: 400 }
    );
  }

  await transporter.sendMail({
    ...message,
    from: `ScanA Team <${email.trim()}>`,
    text: userMessage.trim(),
  });

  return NextResponse.json(
    { message: "Email sent successfully" },
    { status: 200 }
  );
} catch (err: any) {
  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
  );
}

}

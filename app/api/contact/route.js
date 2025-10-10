import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, description } = await req.json();

    // 1️⃣ Send email via Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS, // your App Password (not normal password!)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${description}
      `,
    };

    await transporter.sendMail(mailOptions);

    // 2️⃣ Store message in WordPress
    const wpResponse = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API}/contact-messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`
            ).toString("base64"),
        },
        body: JSON.stringify({
          title: subject,
          content: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p>${description}</p>
          `,
          status: "publish",
        }),
      }
    );

    if (!wpResponse.ok) {
      console.error("Failed to store in WordPress:", await wpResponse.text());
    }

    return Response.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { message: "Error sending message." },
      { status: 500 }
    );
  }
}

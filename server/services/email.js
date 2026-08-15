import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendContactEmail = async ({
  name,
  email,
  phone,
  message,
  recipient,
}) => {
  const safeName = String(name).trim();
  const safeEmail = String(email).trim();
  const safePhone = String(phone || "").trim();
  const safeMessage = String(message).trim();

  try {
    const info = await transporter.sendMail({
      from: `"Wasim Akram Portfolio" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: safeEmail,
      subject: `New Portfolio Inquiry — ${safeName}`,

      text: `
A visitor has contacted you through your portfolio website.

Name: ${safeName}
Email: ${safeEmail}
Phone: ${safePhone || "Not provided"}

Message:
${safeMessage}
`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 650px;
          margin: auto;
          padding: 30px;
          background: #f7f9fc;
          color: #172033;
        ">
          <div style="
            background: #ffffff;
            border-radius: 18px;
            padding: 28px;
            border: 1px solid #e5e7eb;
          ">
            <h2>New Portfolio Inquiry</h2>

            <p>
              A visitor has contacted you through your portfolio website.
            </p>

            <hr />

            <p>
              <strong>Name:</strong><br />
              ${escapeHtml(safeName)}
            </p>

            <p>
              <strong>Email:</strong><br />
              ${escapeHtml(safeEmail)}
            </p>

            <p>
              <strong>Phone:</strong><br />
              ${escapeHtml(safePhone || "Not provided")}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <div style="
              padding: 16px;
              border-radius: 12px;
              background: #f3f4f6;
              white-space: pre-wrap;
            ">
              ${escapeHtml(safeMessage)}
            </div>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

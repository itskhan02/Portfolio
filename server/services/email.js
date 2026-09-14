import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: recipient,
      replyTo: safeEmail,
      subject: `New Contact Request from ${safeName}`,

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

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message || "Resend email failed");
    }

    console.log("Email sent successfully:", data?.id);

    return data;
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

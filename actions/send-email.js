"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>", // change later to verified domain
      to,
      subject,
      react,
    });

    console.log("📨 Email send attempt:", { to, subject });
    console.log("📨 Resend response data:", data);

    return { success: true, data };
  } catch (error) {
    console.error("❌ Failed to send email:", error);

    // Sometimes Resend errors are inside error.response
    if (error?.response) {
      console.error("Resend error response:", error.response);
    }

    return { success: false, error };
  }
}

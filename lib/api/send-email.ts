/**
 * Utility function to convert nested object data into clean HTML for email bodies.
 */
function createHtmlFromData(data: Record<string, any>): string {
  let html = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #111; border-bottom: 2px solid #eee; padding-bottom: 10px;">Nova Submissão de Formulário</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tbody>
  `;

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null || value === "") continue;

    const formattedKey = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    let formattedValue = value;
    if (Array.isArray(value)) {
      formattedValue = value.join(", ");
    } else if (typeof value === "object") {
      formattedValue = `<pre style="background: #f4f4f4; padding: 10px; border-radius: 4px; margin: 0;">${JSON.stringify(value, null, 2)}</pre>`;
    } else if (typeof value === "boolean") {
      formattedValue = value ? "Sim" : "Não";
    }

    html += `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 8px; font-weight: bold; width: 40%; vertical-align: top;">${formattedKey}</td>
            <td style="padding: 12px 8px; vertical-align: top;">${formattedValue}</td>
          </tr>
    `;
  }

  html += `
        </tbody>
      </table>
      <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">Enviado via Creatives Marketing</p>
    </div>
  `;

  return html;
}

/**
 * Sends form submission data to the Supabase Edge Function.
 */
export async function sendEmailSubmission(
  data: Record<string, any>,
  subject: string,
) {
  const apiUrl = process.env.NEXT_PUBLIC_MAIL_API_URL;
  const mailKey = process.env.MAIL_KEY;
  const toEmail = process.env.MAIL_TO;

  const htmlBody = createHtmlFromData(data);

  try {
    const response = await fetch(apiUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: toEmail,
        subject,
        html: htmlBody,
        key: mailKey,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Failed to send email");
    }

    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

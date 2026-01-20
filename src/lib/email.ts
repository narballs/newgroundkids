import { Resend } from "resend";
import { siteConfig } from "@/config/site";

// Initialize Resend - API key from environment
const resend = new Resend(process.env.RESEND_API_KEY);

// Email sender address
const FROM_EMAIL = process.env.FROM_EMAIL || "NewGround Kids <noreply@newgroundkids.com>";

export interface BookingEmailData {
  parentName: string;
  parentEmail: string;
  childName: string;
  childAge: string;
  partyDate: string;
  partyTime: string;
  packageName: string;
}

/**
 * Send booking confirmation email with invite designer link
 */
export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  const { parentName, parentEmail, childName, childAge, partyDate, partyTime, packageName } = data;

  // Build invite URL with pre-filled data
  const inviteParams = new URLSearchParams({
    childName,
    childAge,
    date: partyDate,
    time: partyTime,
  });
  const inviteUrl = `${siteConfig.url}/invites?${inviteParams.toString()}`;

  // Format the date for display
  const formattedDate = new Date(partyDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: parentEmail,
      subject: `🎉 ${childName ? `${childName}'s` : "Your"} Birthday Party is Confirmed!`,
      html: generateBookingEmailHtml({
        parentName,
        childName,
        childAge,
        formattedDate,
        partyTime,
        packageName,
        inviteUrl,
      }),
      text: generateBookingEmailText({
        parentName,
        childName,
        childAge,
        formattedDate,
        partyTime,
        packageName,
        inviteUrl,
      }),
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
    return { success: false, error };
  }
}

interface EmailTemplateData {
  parentName: string;
  childName: string;
  childAge: string;
  formattedDate: string;
  partyTime: string;
  packageName: string;
  inviteUrl: string;
}

function generateBookingEmailHtml(data: EmailTemplateData): string {
  const { parentName, childName, childAge, formattedDate, partyTime, packageName, inviteUrl } =
    data;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${childName}'s Birthday Party Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">
          
          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <table role="presentation" style="border-collapse: collapse;">
                <tr>
                  <td style="background-color: #ffffff; padding: 16px 24px; border-radius: 12px;">
                    <img src="${siteConfig.url}/logo.png" alt="NewGround Kids" style="display: block; max-width: 220px; width: 100%; height: auto;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Main Content Card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
              
              <!-- Success Banner -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #0d9488;">
                <tr>
                  <td align="center" style="padding: 30px 40px; color: #ffffff;">
                    <div style="font-size: 40px; margin-bottom: 10px;">🎉</div>
                    <h1 style="margin: 0; font-size: 28px; font-weight: bold;">You're All Set!</h1>
                    <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">
                      ${childName ? `${childName}'s` : "Your"} ${childAge ? `${childAge}th ` : ""}birthday party is confirmed!
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Party Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 30px 40px;">
                    <p style="margin: 0 0 20px; color: #52525b;">Hi ${parentName.split(" ")[0]},</p>
                    <p style="margin: 0 0 25px; color: #52525b; line-height: 1.6;">
                      We're excited to host ${childName ? `${childName}'s` : "your"} birthday party! Here are your booking details:
                    </p>
                    
                    <!-- Details Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f5; border-radius: 12px;">
                      <tr>
                        <td style="padding: 25px;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="color: #71717a; font-size: 14px;">📦 Package</span><br>
                                <strong style="color: #09090b; font-size: 16px;">${packageName}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="color: #71717a; font-size: 14px;">📅 Date</span><br>
                                <strong style="color: #09090b; font-size: 16px;">${formattedDate}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="color: #71717a; font-size: 14px;">🕐 Time</span><br>
                                <strong style="color: #09090b; font-size: 16px;">${partyTime}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <span style="color: #71717a; font-size: 14px;">📍 Location</span><br>
                                <strong style="color: #09090b; font-size: 16px;">NewGround Kids</strong><br>
                                <span style="color: #71717a; font-size: 14px;">${siteConfig.contact.fullAddress}</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Create Invites CTA -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);">
                <tr>
                  <td align="center" style="padding: 35px 40px;">
                    <div style="font-size: 30px; margin-bottom: 10px;">✨</div>
                    <h2 style="margin: 0 0 10px; font-size: 22px; color: #ffffff; font-weight: bold;">
                      Next: Create Your Invites!
                    </h2>
                    <p style="margin: 0 0 25px; color: rgba(255,255,255,0.9); font-size: 15px; line-height: 1.5;">
                      Design beautiful party invitations to share with your guests.
                    </p>
                    <a href="${inviteUrl}" style="display: inline-block; background-color: #ffffff; color: #0d9488; font-size: 16px; font-weight: bold; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
                      🎨 Create Party Invites →
                    </a>
                    <p style="margin: 15px 0 0; color: rgba(255,255,255,0.7); font-size: 13px;">
                      ${childName ? `Pre-filled with ${childName}'s party details!` : "Pre-filled with your party details!"}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- What's Next -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 30px 40px;">
                    <h3 style="margin: 0 0 20px; font-size: 18px; color: #09090b;">What Happens Next?</h3>
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 10px 0; vertical-align: top; width: 30px;">
                          <div style="width: 24px; height: 24px; background-color: #0d9488; border-radius: 50%; color: #ffffff; font-size: 12px; font-weight: bold; text-align: center; line-height: 24px;">1</div>
                        </td>
                        <td style="padding: 10px 0 10px 12px; vertical-align: top;">
                          <strong style="color: #09090b;">Create & share invites</strong><br>
                          <span style="color: #71717a; font-size: 14px;">Use our designer to make beautiful invitations</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; vertical-align: top; width: 30px;">
                          <div style="width: 24px; height: 24px; background-color: #0d9488; border-radius: 50%; color: #ffffff; font-size: 12px; font-weight: bold; text-align: center; line-height: 24px;">2</div>
                        </td>
                        <td style="padding: 10px 0 10px 12px; vertical-align: top;">
                          <strong style="color: #09090b;">We'll confirm details</strong><br>
                          <span style="color: #71717a; font-size: 14px;">Our team will reach out 1 week before</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; vertical-align: top; width: 30px;">
                          <div style="width: 24px; height: 24px; background-color: #0d9488; border-radius: 50%; color: #ffffff; font-size: 12px; font-weight: bold; text-align: center; line-height: 24px;">3</div>
                        </td>
                        <td style="padding: 10px 0 10px 12px; vertical-align: top;">
                          <strong style="color: #09090b;">Party day!</strong><br>
                          <span style="color: #71717a; font-size: 14px;">Arrive 15 minutes early. We handle the rest!</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 30px 20px;">
              <p style="margin: 0 0 10px; color: #71717a; font-size: 14px;">
                Questions? We're here to help!
              </p>
              <p style="margin: 0; color: #09090b; font-size: 14px;">
                📞 <a href="tel:${siteConfig.contact.phoneRaw}" style="color: #0d9488; text-decoration: none;">${siteConfig.contact.phone}</a>
                &nbsp;&nbsp;•&nbsp;&nbsp;
                ✉️ <a href="mailto:${siteConfig.contact.email}" style="color: #0d9488; text-decoration: none;">${siteConfig.contact.email}</a>
              </p>
              <p style="margin: 20px 0 0; color: #a1a1aa; font-size: 12px;">
                © ${new Date().getFullYear()} NewGround Kids. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function generateBookingEmailText(data: EmailTemplateData): string {
  const { parentName, childName, childAge, formattedDate, partyTime, packageName, inviteUrl } =
    data;

  return `
🎉 YOU'RE ALL SET!

${childName ? `${childName}'s` : "Your"} ${childAge ? `${childAge}th ` : ""}birthday party is confirmed!

Hi ${parentName.split(" ")[0]},

We're excited to host ${childName ? `${childName}'s` : "your"} birthday party! Here are your booking details:

📦 Package: ${packageName}
📅 Date: ${formattedDate}
🕐 Time: ${partyTime}
📍 Location: NewGround Kids
   ${siteConfig.contact.fullAddress}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ NEXT: CREATE YOUR INVITES!

Design beautiful party invitations to share with your guests:
${inviteUrl}

(${childName ? `Pre-filled with ${childName}'s party details!` : "Pre-filled with your party details!"})

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENS NEXT?

1. Create & share invites - Use our designer to make beautiful invitations
2. We'll confirm details - Our team will reach out 1 week before
3. Party day! - Arrive 15 minutes early. We handle the rest!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Questions? We're here to help!
📞 ${siteConfig.contact.phone}
✉️ ${siteConfig.contact.email}

© ${new Date().getFullYear()} NewGround Kids
  `.trim();
}

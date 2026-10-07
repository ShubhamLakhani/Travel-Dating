// Triply Email HTML and Plain-Text Formatters (Pure TypeScript, Zero Dependencies)
// File: lib/communication/email-formatters.ts

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface EarlyAccessConfirmationParams {
  destinationName: string;
  arrivalFormatted: string;
  departureFormatted: string;
}

export function renderEarlyAccessConfirmationHtml({
  destinationName,
  arrivalFormatted,
  departureFormatted,
}: EarlyAccessConfirmationParams): string {
  const destSafe = escapeHtml(destinationName);
  const arrSafe = escapeHtml(arrivalFormatted);
  const depSafe = escapeHtml(departureFormatted);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Triply Early Access</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; color: #0B0F2D; padding: 40px 20px; line-height: 1.6; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; padding: 36px 32px; border: 1px solid #EDE8E1; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
    <div style="margin-bottom: 24px;">
      <span style="font-size: 24px; font-weight: 800; letter-spacing: -0.03em; color: #FF735D;">triply</span>
    </div>
    <h1 style="font-size: 22px; font-weight: 700; color: #0B0F2D; margin: 0 0 16px 0; letter-spacing: -0.02em;">
      You're on the Triply early-access list. ✈️
    </h1>
    <div style="background-color: #F7E9DA; border-radius: 12px; padding: 16px 20px; margin: 20px 0 24px 0;">
      <div style="font-size: 18px; font-weight: 700; color: #0B0F2D; margin-bottom: 4px;">
        ${destSafe}
      </div>
      <div style="font-size: 14px; color: #6B5BFF; font-weight: 600;">
        ${arrSafe} &rarr; ${depSafe}
      </div>
    </div>
    <p style="font-size: 15px; color: #374151; margin: 0 0 14px 0;">
      Thanks for helping us validate Triply.
    </p>
    <p style="font-size: 14px; color: #4B5563; margin: 0 0 14px 0;">
      Triply is still in pre-launch validation. We'll use your submission to understand where travelers want the product to launch and let you know as we begin opening early matching around your destination.
    </p>
    <div style="font-size: 13px; color: #6B7280; background-color: #FAF7F2; padding: 12px 16px; border-radius: 8px; margin: 20px 0; border-left: 3px solid #6B5BFF;">
      <strong>Privacy note:</strong> Your submitted trip does not create a public dating profile. We do not ask for your accommodation or live GPS location.
    </div>
    <hr style="border: none; border-top: 1px solid #EDE8E1; margin: 28px 0;" />
    <p style="font-size: 12px; color: #9CA3AF; margin: 0;">
      Triply: Two travelers. One shared destination.<br>
      This is a transactional confirmation regarding your early-access submission.
    </p>
  </div>
</body>
</html>`;
}

export function renderEarlyAccessConfirmationText({
  destinationName,
  arrivalFormatted,
  departureFormatted,
}: EarlyAccessConfirmationParams): string {
  return `You're on the Triply early-access list. ✈️

${destinationName}
${arrivalFormatted} → ${departureFormatted}

Thanks for helping us validate Triply.

Triply is still in pre-launch validation. We'll use your submission to understand where travelers want the product to launch and let you know as we begin opening early matching around your destination.

Privacy note: Your submitted trip does not create a public dating profile. We do not ask for your accommodation or live GPS location.

Triply: Two travelers. One shared destination.
`;
}

export interface NewSignupNotificationParams {
  destinationName: string;
  arrivalFormatted: string;
  departureFormatted: string;
  travelMode: string;
  interviewOptIn: boolean;
  marketingUpdates: boolean;
}

export function renderNewSignupNotificationHtml({
  destinationName,
  arrivalFormatted,
  departureFormatted,
  travelMode,
  interviewOptIn,
  marketingUpdates,
}: NewSignupNotificationParams): string {
  const destSafe = escapeHtml(destinationName);
  const arrSafe = escapeHtml(arrivalFormatted);
  const depSafe = escapeHtml(departureFormatted);
  const modeSafe = escapeHtml(travelMode);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Triply early-access signup</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; color: #0B0F2D; padding: 40px 20px; line-height: 1.6; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; padding: 36px 32px; border: 1px solid #EDE8E1; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
    <div style="margin-bottom: 20px;">
      <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.03em; color: #FF735D;">triply</span>
      <span style="margin-left: 10px; font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Internal Operator Alert</span>
    </div>
    <h1 style="font-size: 20px; font-weight: 700; color: #0B0F2D; margin: 0 0 16px 0; letter-spacing: -0.02em;">
      New Triply early-access signup
    </h1>
    <div style="background-color: #F7E9DA; border-radius: 12px; padding: 20px; margin: 20px 0 24px 0; font-size: 14px;">
      <div style="margin-bottom: 10px;">
        <strong style="color: #4B5563;">Destination:</strong> <span style="font-weight: 700; color: #0B0F2D;">${destSafe}</span>
      </div>
      <div style="margin-bottom: 10px;">
        <strong style="color: #4B5563;">Travel dates:</strong> <span style="font-weight: 600; color: #6B5BFF;">${arrSafe} &rarr; ${depSafe}</span>
      </div>
      <div style="margin-bottom: 10px;">
        <strong style="color: #4B5563;">Travel mode:</strong> <span style="color: #0B0F2D; text-transform: capitalize;">${modeSafe}</span>
      </div>
      <div style="margin-bottom: 10px;">
        <strong style="color: #4B5563;">Interview opt-in:</strong> <span style="color: ${interviewOptIn ? "#2E6B52" : "#6B7280"}; font-weight: 600;">${interviewOptIn ? "Yes" : "No"}</span>
      </div>
      <div>
        <strong style="color: #4B5563;">Marketing updates:</strong> <span style="color: ${marketingUpdates ? "#2E6B52" : "#6B7280"}; font-weight: 600;">${marketingUpdates ? "Yes" : "No"}</span>
      </div>
    </div>
    <p style="font-size: 14px; color: #4B5563; margin: 0 0 20px 0;">
      Open the Triply admin dashboard for full details.
    </p>
    <a href="https://triply.toolmint.cc/admin" style="display: inline-block; background-color: #FF735D; color: #FFFFFF; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 8px; padding: 10px 20px;">
      Open Admin Dashboard
    </a>
    <hr style="border: none; border-top: 1px solid #EDE8E1; margin: 28px 0;" />
    <p style="font-size: 12px; color: #9CA3AF; margin: 0;">
      Triply: Internal System Notification<br>
      Delivered securely to configured operator inbox.
    </p>
  </div>
</body>
</html>`;
}

export function renderNewSignupNotificationText({
  destinationName,
  arrivalFormatted,
  departureFormatted,
  travelMode,
  interviewOptIn,
  marketingUpdates,
}: NewSignupNotificationParams): string {
  return `New Triply early-access signup

Destination: ${destinationName}
Travel dates: ${arrivalFormatted} → ${departureFormatted}
Travel mode: ${travelMode}
Interview opt-in: ${interviewOptIn ? "Yes" : "No"}
Marketing updates: ${marketingUpdates ? "Yes" : "No"}

Open the Triply admin dashboard for full details:
https://triply.toolmint.cc/admin
`;
}

export interface PrivacyRequestNotificationParams {
  requesterEmail: string;
  requestType: string;
  message?: string;
  submittedAtFormatted: string;
}

export function renderPrivacyRequestNotificationHtml({
  requesterEmail,
  requestType,
  message,
  submittedAtFormatted,
}: PrivacyRequestNotificationParams): string {
  const emailSafe = escapeHtml(requesterEmail);
  const typeSafe = escapeHtml(requestType);
  const timeSafe = escapeHtml(submittedAtFormatted);
  const msgSafe = message ? escapeHtml(message) : "";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Triply privacy request: ${typeSafe}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F2; color: #0B0F2D; padding: 40px 20px; line-height: 1.6; margin: 0;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; padding: 36px 32px; border: 1px solid #EDE8E1; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
    <div style="margin-bottom: 20px;">
      <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.03em; color: #FF735D;">triply</span>
      <span style="margin-left: 10px; font-size: 12px; font-weight: 700; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em;">Privacy Action Request</span>
    </div>
    <h1 style="font-size: 20px; font-weight: 700; color: #0B0F2D; margin: 0 0 16px 0; letter-spacing: -0.02em;">
      Triply privacy request: ${typeSafe}
    </h1>
    <div style="background-color: #F7E9DA; border-radius: 12px; padding: 20px; margin: 20px 0 24px 0; font-size: 14px;">
      <div style="margin-bottom: 12px;">
        <strong style="color: #4B5563;">Request Type:</strong> <span style="font-weight: 700; color: #0B0F2D;">${typeSafe}</span>
      </div>
      <div style="margin-bottom: 12px;">
        <strong style="color: #4B5563;">User Contact Email:</strong> <span style="font-family: monospace; color: #0B0F2D; font-weight: 600;">${emailSafe}</span>
      </div>
      <div style="margin-bottom: 12px;">
        <strong style="color: #4B5563;">Submitted:</strong> <span style="color: #6B7280;">${timeSafe}</span>
      </div>
      ${
        msgSafe
          ? `<div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #EDE8E1;">
        <strong style="color: #4B5563; display: block; margin-bottom: 6px;">Optional User Message:</strong>
        <div style="background-color: #FFFFFF; padding: 12px 14px; border-radius: 8px; border: 1px solid #EDE8E1; color: #0B0F2D; white-space: pre-wrap; font-size: 13px;">${msgSafe}</div>
      </div>`
          : ""
      }
    </div>
    <p style="font-size: 14px; color: #4B5563; margin: 0 0 16px 0;">
      You can inspect and manage user validation records directly in the Supabase or Triply Admin Console.
    </p>
    <hr style="border: none; border-top: 1px solid #EDE8E1; margin: 28px 0;" />
    <p style="font-size: 12px; color: #9CA3AF; margin: 0;">
      Triply: Internal Privacy Request Dispatcher<br>
      This communication is delivered solely to the authorized operator contact.
    </p>
  </div>
</body>
</html>`;
}

export function renderPrivacyRequestNotificationText({
  requesterEmail,
  requestType,
  message,
  submittedAtFormatted,
}: PrivacyRequestNotificationParams): string {
  return `Triply privacy request: ${requestType}

Request Type: ${requestType}
User Contact Email: ${requesterEmail}
Submitted: ${submittedAtFormatted}
${message ? `\nUser Message:\n${message}\n` : ""}
Triply Privacy Dispatcher
`;
}

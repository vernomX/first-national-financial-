export function verificationEmailTemplate(code: string, userName: string): string {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Verification Code</title>
    </head>
    <body style="margin:0;padding:24px;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#020617;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:520px;background-color:#ffffff;border-radius:16px;padding:32px;box-shadow:0 18px 45px rgba(15,23,42,0.08);">
              <tr>
                <td align="left" style="padding-bottom:16px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">
                  First National Financial
                </td>
              </tr>
              <tr>
                <td align="left" style="padding-bottom:8px;font-size:24px;font-weight:700;color:#020617;">
                  Verification Code
                </td>
              </tr>
              <tr>
                <td align="left" style="padding-bottom:16px;font-size:15px;line-height:1.6;color:#4b5563;">
                  Hi ${userName},<br />
                  <br />
                  Use the verification code below to securely continue with your request. This code is valid for a short period of time and should not be shared with anyone.
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:20px 16px 24px;">
                  <div style="display:inline-block;padding:14px 32px;border-radius:999px;background-color:#f3f4ff;border:1px solid #e5e7eb;font-size:24px;letter-spacing:0.3em;font-weight:700;color:#020617;">
                    ${code}
                  </div>
                </td>
              </tr>
              <tr>
                <td align="left" style="padding-bottom:16px;font-size:13px;line-height:1.6;color:#6b7280;">
                  If you did not initiate this action, please disregard this email. No changes will be made to your account.
                </td>
              </tr>
              <tr>
                <td align="left" style="padding-top:8px;font-size:13px;line-height:1.6;color:#6b7280;">
                  Sincerely,<br />
                  First National Financial Security Team
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-top:24px;border-top:1px solid #e5e7eb;font-size:11px;line-height:1.6;color:#9ca3af;">
                  This message was sent by First National Financial. This is a fictional experience for demonstration purposes only.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

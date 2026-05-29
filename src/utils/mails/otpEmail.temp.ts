export const otpEmailTemp = (otp: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your identity</title>
  <style>
    /* Reset */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #F4F3EF;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      padding: 40px 16px;
      color: #1a1a1a;
    }

    /* Wrapper */
    .email-wrapper {
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e5e3dc;
    }

    /* Header */
    .email-header {
      background: #0F1117;
      padding: 32px 40px 28px;
      text-align: center;
    }
    .brand {
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: 24px;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .brand em {
      font-style: italic;
      color: #7F77DD;
    }

    /* Body */
    .email-body {
      padding: 32px 40px;
    }
    .greeting {
      font-size: 13px;
      color: #888780;
      margin-bottom: 6px;
    }
    .headline {
      font-size: 22px;
      font-weight: 500;
      color: #1a1a1a;
      margin-bottom: 14px;
      line-height: 1.3;
    }
    .description {
      font-size: 14px;
      color: #888780;
      line-height: 1.7;
      margin-bottom: 28px;
    }

    /* OTP digits */
    .otp-block {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-bottom: 24px;
    }
    .otp-digit {
      width: 56px;
      height: 68px;
      background: #F4F3EF;
      border: 1px solid #D3D1C7;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'DM Mono', 'Courier New', monospace;
      font-size: 28px;
      font-weight: 500;
      color: #1a1a1a;
    }
    .otp-digit.accent {
      background: #EEEDFE;
      border-color: #AFA9EC;
      color: #3C3489;
    }

    /* Timer */
    .timer-row {
      display: flex;
      align-items: center;
      gap: 6px;
      justify-content: center;
      margin-bottom: 28px;
      font-size: 13px;
      color: #888780;
    }
    .timer-row .timer-icon {
      font-size: 15px;
    }
    .timer-count {
      font-family: 'DM Mono', 'Courier New', monospace;
      font-weight: 500;
      color: #534AB7;
    }

    /* Divider */
    .divider {
      height: 1px;
      background: #e5e3dc;
      margin-bottom: 24px;
    }

    /* Warning box */
    .warning-box {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      background: #FAEEDA;
      border: 1px solid #FAC775;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 0;
    }
    .warning-box .warning-icon {
      flex-shrink: 0;
      margin-top: 1px;
      font-size: 16px;
      color: #854F0B;
    }
    .warning-box p {
      font-size: 13px;
      color: #633806;
      line-height: 1.6;
    }

    /* Footer */
    .email-footer {
      border-top: 1px solid #e5e3dc;
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .footer-links a {
      font-size: 12px;
      color: #B4B2A9;
      text-decoration: none;
      margin-right: 14px;
    }
    .footer-links a:hover {
      color: #5F5E5A;
    }
    .footer-copy-btn {
      font-size: 12px;
      font-family: inherit;
      background: transparent;
      border: 1px solid #D3D1C7;
      border-radius: 8px;
      padding: 7px 16px;
      color: #888780;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s, color 0.15s;
    }
    .footer-copy-btn:hover {
      background: #F4F3EF;
      color: #1a1a1a;
    }

    /* Responsive */
    @media (max-width: 560px) {
      .email-body, .email-header, .email-footer {
        padding-left: 24px;
        padding-right: 24px;
      }
      .otp-digit {
        width: 44px;
        height: 56px;
        font-size: 22px;
      }
      .otp-block {
        gap: 8px;
      }
    }
  </style>

  <!-- Optional: Load DM Sans + DM Serif Display + DM Mono from Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
</head>
<body>

  <div class="email-wrapper">

    <!-- Header -->
    <div class="email-header">
      <p class="brand">JOLI<em>CRM</em></p>
    </div>

    <!-- Body -->
    <div class="email-body">

      <p class="greeting">Hello,</p>
      <h1 class="headline">Your verification code</h1>
      <p class="description">
        Use the 6-digit code below to complete your sign-in.
        Do not share this code with anyone.
      </p>

      <!-- OTP Digits -->
<!-- OTP as plain text fallback -->
<p style="text-align:center;font-family:'Courier New',monospace;font-size:32px;font-weight:700;letter-spacing:12px;color:#1a1a1a;margin-bottom:24px;">${otp}</p>

      <!-- Expiry timer (static; replace with dynamic value server-side) -->
      <div class="timer-row">
        <span class="timer-icon">&#9201;</span>
        <span>This code expires in 10m</span>
      </div>

      <div class="divider"></div>

      <!-- Security warning -->
      <div class="warning-box">
        <span class="warning-icon">&#128274;</span>
        <p>
          If you didn't request this code, you can safely ignore this email.
          Someone may have entered your email address by mistake.
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div class="email-footer">
      <div class="footer-links">
        <a href="#">Privacy</a>
        <a href="#">Unsubscribe</a>
        <a href="#">Help</a>
      </div>
      <button class="footer-copy-btn" onclick="copyOTP()">
        &#128203; Copy code
      </button>
    </div>

  </div>

  <script>
    function copyOTP() {
      const code = '${otp}';
      navigator.clipboard.writeText(code).then(() => {
        const btn = document.querySelector('.footer-copy-btn');
        btn.textContent = '✓ Copied!';
        btn.style.color = '#0F6E56';
        setTimeout(() => {
          btn.innerHTML = '&#128203; Copy code';
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        alert('OTP Code: ' + code);
      });
    }
  </script>

</body>
</html>`;
};

export const passwordEmailTemp = (name: string, password: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Your account credentials</title>
  <style>
    body{margin:0;padding:0;background:#f4f4f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
    .wrapper{max-width:600px;margin:40px auto;}
    .header{background:#1a1a2e;padding:32px 40px;text-align:center;border-radius:12px 12px 0 0;}
    .logo{color:#fff;font-size:20px;font-weight:500;}
    .body{background:#fff;padding:40px;}
    h1{font-size:22px;font-weight:500;color:#1a1a1a;margin:0 0 16px;}
    p{font-size:15px;color:#555;line-height:1.7;margin:0 0 20px;}
    .pass-box{background:#f0f4ff;border:1.5px dashed #4a6fa5;border-radius:8px;padding:18px 24px;text-align:center;margin:24px 0;}
    .pass-label{font-size:12px;color:#4a6fa5;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;}
    .pass-value{font-size:26px;font-weight:600;color:#1a1a2e;font-family:monospace;letter-spacing:0.14em;}
    .warning{background:#fffbe6;border-left:3px solid #f0c040;padding:14px 18px;border-radius:0 8px 8px 0;margin:24px 0;}
    .warning p{font-size:14px;color:#7a5c00;margin:0;}
    .steps{list-style:none;padding:0;margin:0 0 20px;}
    .steps li{font-size:14px;color:#555;padding:6px 0;display:flex;align-items:center;gap:10px;}
    .step-num{width:22px;height:22px;border-radius:50%;background:#1a1a2e;color:#fff;font-size:12px;font-weight:500;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
    .btn-wrap{text-align:center;margin:28px 0;}
    .btn{display:inline-block;background:#1a1a2e;color:#fff;font-size:15px;font-weight:500;padding:14px 36px;border-radius:8px;text-decoration:none;}
    hr{border:none;border-top:1px solid #ebebeb;margin:28px 0;}
    .footer{background:#f4f4f0;padding:20px 40px;text-align:center;border-radius:0 0 12px 12px;}
    .footer p{font-size:12px;color:#999;margin:0;}
  </style>
</head>
<body>
<div class="wrapper">
  <div class="header"><div class="logo">● JOLI CRM</div></div>
  <div class="body">
    <h1>Welcome aboard! 👋</h1>
    <p>Dear <strong>${name.split(' ')}</strong>,</p>
    <p>Your account has been created successfully. Below are your login credentials:</p>
    <div class="pass-box">
      <div class="pass-label">Temporary Password</div>
      <div class="pass-value">${password}</div>
    </div>
    <div class="warning"><p>⚠️ This is a temporary password — please change it immediately after your first login.</p></div>
    <ul class="steps">
      <li><span class="step-num">1</span>Click the "Log in now" button below</li>
      <li><span class="step-num">2</span>Enter your email and the temporary password</li>
      <li><span class="step-num">3</span>Go to Account Settings and set a new password</li>
    </ul>
    <div class="btn-wrap">
      <a href="{{login_url}}" class="btn">Log in now →</a>
    </div>
    <hr>
    <p style="font-size:13px">Need help? Reach us at <a href="mailto:{{support_email}}">{{support_email}}</a></p>
  </div>
  <div class="footer"><p>© 2026 YourBrand, Inc. · All rights reserved</p></div>
</div>
</body>
</html>`;
};

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Contact Form Message</title>
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f5;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    table {
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      background-color: #f4f4f5;
      padding: 24px 0;
    }
    .main {
      width: 100%;
      max-width: 640px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e4e4e7;
    }
    .header {
      padding: 20px 24px;
      background: #0f172a;
      color: #e5e7eb;
    }
    .logo {
      font-size: 1.25rem;
      letter-spacing: -0.04em;
      font-weight: 500;
    }
    .title {
      margin-top: 12px;
      font-size: 1.5rem;
      line-height: 1.2;
      letter-spacing: -0.04em;
      font-weight: 500;
    }
    .content {
      padding: 20px 24px 24px 24px;
      color: #111827;
      font-size: 0.95rem;
      line-height: 1.6;
    }
    .meta-table {
      width: 100%;
      margin-top: 16px;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      overflow: hidden;
    }
    .meta-label {
      width: 140px;
      padding: 10px 12px;
      background-color: #f9fafb;
      color: #4b5563;
      font-size: 0.85rem;
      font-weight: 500;
      border-bottom: 1px solid #e5e7eb;
    }
    .meta-value {
      padding: 10px 12px;
      background-color: #ffffff;
      color: #111827;
      font-size: 0.95rem;
      border-bottom: 1px solid #e5e7eb;
      word-break: break-word;
    }
    .meta-row-last .meta-label,
    .meta-row-last .meta-value {
      border-bottom: none;
    }
    .message-label {
      margin-top: 20px;
      margin-bottom: 8px;
      font-size: 0.9rem;
      color: #6b7280;
      font-weight: 500;
    }
    .message-box {
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 12px 14px;
      background-color: #f9fafb;
      font-size: 0.95rem;
      color: #111827;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      padding: 16px 24px 20px 24px;
      font-size: 0.8rem;
      color: #9ca3af;
      background-color: #f9fafb;
      border-top: 1px solid #e4e4e7;
    }
    .footer a {
      color: #6b7280;
      text-decoration: none;
    }
    @media only screen and (max-width: 600px) {
      .main {
        border-radius: 0;
      }
      .header,
      .content,
      .footer {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
      .meta-label {
        width: 110px;
      }
    }
  </style>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center">
        <table class="main" width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <!-- Header -->
          <tr>
            <td class="header">
              <div class="logo">AC</div>
              <div class="title">New contact form submission</div>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content">
              <p style="margin: 0 0 8px 0;">You have received a new message from your website contact form.</p>
              <p style="margin: 0 0 16px 0;">Here are the details:</p>

              <!-- Meta info -->
              <table class="meta-table" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="meta-label">From</td>
                  <td class="meta-value">
                    <?php echo htmlspecialchars($field_first_name); ?>
                  </td>
                </tr>
                <tr>
                  <td class="meta-label">E-mail</td>
                  <td class="meta-value">
                    <?php echo htmlspecialchars($field_email); ?>
                  </td>
                </tr>
                <tr>
                  <td class="meta-label">Phone Number</td>
                  <td class="meta-value meta-row-last">
                    <?php echo htmlspecialchars($field_phone); ?>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div class="message-label">Message</div>
              <div class="message-box">
                <?php echo nl2br(htmlspecialchars($field_mensage)); ?>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              This email was generated automatically from your website contact form.
              <br>
              If you were not expecting this, you can safely ignore it.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
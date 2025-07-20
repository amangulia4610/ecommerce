const verifyEmailTemplate = (name, url) => {
    return `
        <html>
            <body style="font-family: Arial, sans-serif; background-color: #101820; margin: 0; padding: 0;">
                <div style="max-width: 500px; margin: 40px auto; background: #fff; border-radius: 18px; box-shadow: 0 2px 12px rgba(0,0,0,0.10); padding: 32px;">
                    <h1 style="color: #101820; font-size: 24px;">Welcome ${name}!</h1>
                    <p style="color: #222; font-size: 16px;">Thank you for signing up. Please verify your email address by clicking the link below:</p>
                    <a href="${url}" style="display: inline-block; margin: 20px 0; padding: 14px 28px; background: #0057b8; color: #fff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;">Verify Email</a>
                    <p style="color: #888; font-size: 14px;">If you did not sign up, please ignore this email.</p>
                </div>
            </body>
        </html>
    `;
}
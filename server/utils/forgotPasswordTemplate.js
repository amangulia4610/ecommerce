const forgotPasswordTemplate = (name, otp) => {
    return `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f6f6f6;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 500px;
                        margin: 40px auto;
                        background: #fff;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                        padding: 32px 24px;
                    }
                    h1 {
                        color: #333;
                        font-size: 24px;
                        margin-bottom: 16px;
                    }
                    p {
                        color: #555;
                        font-size: 16px;
                        margin-bottom: 12px;
                    }
                    .otp {
                        font-size: 20px;
                        color: #1976d2;
                        font-weight: bold;
                        letter-spacing: 2px;
                        background: #e3f2fd;
                        padding: 8px 16px;
                        border-radius: 4px;
                        display: inline-block;
                        margin-bottom: 16px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Forgot Password OTP</h1>
                    <p>Hi ${name},</p>
                    <p>Your OTP is:</p>
                    <div class="otp">${otp}</div>
                    <p>This OTP is valid for 15 minutes.</p>
                </div>
            </body>
        </html>
    `;
}

export default forgotPasswordTemplate;
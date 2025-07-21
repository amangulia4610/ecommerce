const generatedOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp; // Return the generated OTP
}

export default generatedOTP;
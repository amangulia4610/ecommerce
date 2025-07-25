export const baseUrl = "http://localhost:8080";

const SummaryApi = {
    register : {
        url: "/api/user/register",
        method: "POST",
    },
    login: {
        url: "/api/user/login",
        method: "POST",
    },
    forgotPassword: {
        url: "/api/user/forgot-password",
        method: "PUT",
    },
    verifyForgotPasswordOTP: {
        url: "/api/user/verify-forgot-password-otp",
        method: "PUT",
    },
    resetPassword: {
        url: "/api/user/reset-password",
        method: "PUT",
    },
    refreshToken: {
        url: "/api/user/refresh-token",
        method: "POST",
    },
    logout: {
        url: "/api/user/logout",
        method: "GET",
    },
    userDetails: {
        url: "/api/user/user-details",  
        method: "GET",
    }

}
export default SummaryApi;
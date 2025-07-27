export const baseUrl = "http://localhost:8080";

const SummaryApi = {
    register : {
        url: "/api/user/register",
        method: "POST"
    },
    login: {
        url: "/api/user/login",
        method: "POST"
    },
    forgotPassword: {
        url: "/api/user/forgot-password",
        method: "POST"
    },
    verifyForgotPasswordOTP: {
        url: "/api/user/verify-forgot-password-otp",
        method: "POST"
    },
    resetPassword: {
        url: "/api/user/reset-password",
        method: "POST"
    },
    refreshToken: {
        url: "/api/user/refresh-token",
        method: "POST"
    },
    logout: {
        url: "/api/user/logout",
        method: "GET"
    },
    userDetails: {
        url: "/api/user/user-details",
        method: "GET"
    },
    uploadAvatar: {
        url: "/api/user/upload-avatar",
        method: "PUT"
    },
    updateUser: {
        url: "/api/user/update-user",
        method: "PUT"
    },
    verifyEmail: {
        url: "/api/user/verify-email",
        method: "POST"
    },
    resendVerificationEmail: {
        url: "/api/user/resend-verification-email",
        method: "POST"
    },
    
    // Category APIs
    addCategory: {
        url: "/api/category/add-category",
        method: "POST"
    },
    getCategories: {
        url: "/api/category/get-categories",
        method: "GET"
    },
    getCategory: {
        url: "/api/category/get-category",
        method: "GET"
    },
    updateCategory: {
        url: "/api/category/update-category",
        method: "PUT"
    },
    deleteCategory: {
        url: "/api/category/delete-category",
        method: "DELETE"
    },
    
    // Product APIs
    addProduct: {
        url: "/api/product/add-product",
        method: "POST"
    },
    getProducts: {
        url: "/api/product/get-products",
        method: "GET"
    },
    getProduct: {
        url: "/api/product/get-product",
        method: "GET"
    },
    updateProduct: {
        url: "/api/product/update-product",
        method: "PUT"
    },
    deleteProduct: {
        url: "/api/product/delete-product",
        method: "DELETE"
    },
    toggleProductPublish: {
        url: "/api/product/toggle-publish",
        method: "PATCH"
    },
    
    // Cart APIs
    addToCart: {
        url: "/api/cart/add-to-cart",
        method: "POST"
    },
    getCartItems: {
        url: "/api/cart/get-cart-items",
        method: "GET"
    },
    updateCartQuantity: {
        url: "/api/cart/update-quantity",
        method: "PUT"
    },
    removeFromCart: {
        url: "/api/cart/remove-from-cart",
        method: "DELETE"
    },
    clearCart: {
        url: "/api/cart/clear-cart",
        method: "DELETE"
    },
    
    // Order APIs
    createOrder: {
        url: "/api/order/create-order",
        method: "POST"
    },
    getUserOrders: {
        url: "/api/order/user-orders",
        method: "GET"
    },
    getUserOrder: {
        url: "/api/order/user-order",
        method: "GET"
    },
    getOrders: {
        url: "/api/order/get-orders",
        method: "GET"
    },
    getOrder: {
        url: "/api/order/get-order",
        method: "GET"
    },
    updateOrderStatus: {
        url: "/api/order/update-order-status",
        method: "PUT"
    },
    deleteOrder: {
        url: "/api/order/delete-order",
        method: "DELETE"
    },
    getOrderStats: {
        url: "/api/order/order-stats",
        method: "GET"
    },

    // Address APIs
    getUserAddresses: {
        url: "/api/address/get-addresses",
        method: "GET"
    },
    getAddress: {
        url: "/api/address/get-address",
        method: "GET"
    },
    createAddress: {
        url: "/api/address/create-address",
        method: "POST"
    },
    updateAddress: {
        url: "/api/address/update-address",
        method: "PUT"
    },
    deleteAddress: {
        url: "/api/address/delete-address",
        method: "DELETE"
    },

    // Admin - User Management
    adminAllUsers: {
        url: '/api/admin/user/all-users',
        method: 'GET'
    },
    adminUserStats: {
        url: '/api/admin/user/stats',
        method: 'GET'
    },
    adminUserDetails: {
        url: '/api/admin/user',
        method: 'GET'
    },
    adminUpdateUserStatus: {
        url: '/api/admin/user',
        method: 'PUT'
    },
    adminUpdateUserRole: {
        url: '/api/admin/user',
        method: 'PUT'
    },
    adminUpdateUserEmailVerification: {
        url: '/api/admin/user',
        method: 'PUT'
    },
    adminDeleteUser: {
        url: '/api/admin/user',
        method: 'DELETE'
    }
};

export default SummaryApi;
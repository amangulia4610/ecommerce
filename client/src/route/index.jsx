import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import MyAccount from "../pages/MyAccount";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import Addresses from "../pages/Addresses";
import AdminDashboard from "../pages/AdminDashboard";
import CategoryManagement from "../pages/CategoryManagement";
import ProductManagement from "../pages/ProductManagement";
import OrderManagement from "../pages/OrderManagement";
import UserManagement from "../pages/UserManagement";
import About from "../pages/About";
import Contact from "../pages/Contact";
import HelpCenter from "../pages/HelpCenter";
import Returns from "../pages/Returns";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import CookiePolicy from "../pages/CookiePolicy";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
            {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/my-account",
        element: <MyAccount />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "/addresses",
        element: <Addresses />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/categories",
        element: <CategoryManagement />,
      },
      {
        path: "/admin/products",
        element: <ProductManagement />,
      },
      {
        path: "/admin/orders",
        element: <OrderManagement />,
      },
      {
        path: "/admin/users",
        element: <UserManagement />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/help",
        element: <HelpCenter />,
      },
      {
        path: "/returns",
        element: <Returns />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/cookies",
        element: <CookiePolicy />,
      }
      

    ]
  }
    
]);
export default router;

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPassword from "../pages/ResetPassword";
import MyAccount from "../pages/MyAccount";
import Orders from "../pages/Orders";
import Addresses from "../pages/Addresses";
import AdminDashboard from "../pages/AdminDashboard";
import CategoryManagement from "../pages/CategoryManagement";
import ProductManagement from "../pages/ProductManagement";
import OrderManagement from "../pages/OrderManagement";
import UserManagement from "../pages/UserManagement";

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
        path: "/search",
        element: <Search />,
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
      }
      

    ]
  }
    
]);
export default router;

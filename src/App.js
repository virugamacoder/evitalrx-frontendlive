import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import OTPVerification from "./pages/OTPVerification";
import MyProfile from "./pages/MyProfile";
import ForgotPasswordSendmail from "./pages/ForgotPasswordSendmail";
import ResetPassword from "./pages/ResetPassword";
import Protected from "./pages/Protected/Protected";
import "./styles.css";
import PageNotFound from "./pages/PageNotFound";
import UnProtected from "./pages/Unprotected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: (
      <UnProtected>
        <SignUp />
      </UnProtected>
    ),
  },
  {
    path: "/login",
    element: (
      <UnProtected>
        <Login />
      </UnProtected>
    ),
  },
  {
    path: "/otpverification",
    element: <OTPVerification />,
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <MyProfile />
      </Protected>
    ),
  },
  {
    path: "/forgotpassword",
    element: <ForgotPasswordSendmail />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} exact={true} />;
}

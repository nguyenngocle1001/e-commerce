import LoginPage from "pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HasLogged from "./HasLogged";
import LogoutPage from "pages/LogoutPage";
import SignUpPage from "pages/SignUpPage";
import HomePage from "pages/HomePage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import ProductPage from "pages/ProductPage";
import NotFoundPage from "pages/NotFoundPage";
import DetailPage from "pages/DetailPage";
import CartPage from "pages/CartPage";
import PaymentPage from "pages/PaymentPage";
import ProfilePage from "pages/ProfilePage";
import React, { Suspense } from "react";
import Loading from "components/common/Loading";

const MainLayout = React.lazy(() => import("layouts/MainLayout"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <HasLogged>
            <LoginPage />
          </HasLogged>
        ),
      },
      {
        path: "/forgot-password",
        element: (
          <HasLogged>
            <ForgotPasswordPage />
          </HasLogged>
        ),
      },
      {
        path: "/reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/products/:slug",
        element: <DetailPage />,
      },
      {
        path: "/me",
        element: (
          <PrivateRoute>
            <p>me</p>
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/me",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/logout",
        element: (
          <PrivateRoute>
            <LogoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/401",
        element: (
          <PrivateRoute>
            <LogoutPage />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  ,
];

export default routes;

import React, { useEffect } from "react";

import LoginForm from "./components/LoginForm";

import "./style.scss";
import NewCustomer from "./components/NewCustomer";
import OtherLogin from "./components/OtherLogin";

function LoginPage() {
  useEffect(() => {
    document.title = "Lexe Store | Login";
  }, []);
  return (
    <div className="login-page">
      <div className="container">
        <h1 className="login-page__heading">Customer Login</h1>
        <div className="login-page__body">
          <div className="login-page__left">
            <LoginForm />
          </div>

          <div className="login-page__right">
            <NewCustomer />

            <OtherLogin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

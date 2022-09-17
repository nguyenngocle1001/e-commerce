import React from "react";

import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

import Heading from "components/common/Heading";

import useAuthSelector from "hooks/selectors/useAuthSelector";
import { AUTH } from "constants/props";
import { LOGIN_FB_API, LOGIN_GG_API } from "constants/apiPath";

import "./style.scss";

function OtherLogin() {
  const { onLogin } = useAuthSelector(AUTH.login);

  const responseFacebook = (response) => {
    const { userID, accessToken } = response;

    onLogin({
      url: LOGIN_FB_API,
      body: {
        userID,
        accessToken,
      },
    });
  };

  const responseGoogle = (response) => {
    onLogin({ url: LOGIN_GG_API, body: { idToken: response.tokenId } });
  };

  return (
    <div className="login-other">
      <Heading heading="Or" desc="Login with other methods" />
      <FacebookLogin
        appId={process.env.REACT_APP_FB_APP_ID}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="login-other__btn login-other__fb"
      />
      <GoogleLogin
        clientId={process.env.REACT_APP_GG_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <button
            className="login-other__btn login-other__gg"
            onClick={renderProps.onClick}
          >
            Login with Google
          </button>
        )}
      />
    </div>
  );
}

export default OtherLogin;

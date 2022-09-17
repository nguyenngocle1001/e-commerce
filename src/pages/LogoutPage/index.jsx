import React, { useEffect } from "react";
import useAuthSelector from "hooks/selectors/useAuthSelector";
import { AUTH } from "constants/props";
import Loading from "components/common/Loading";

function LogoutPage() {
  const { onLogout } = useAuthSelector(AUTH.login);

  useEffect(() => {
    onLogout();
  }, []);

  useEffect(()=>{
    document.title = "Lexe Store | Logout..."
  }, []);

  return <Loading />;
}

export default LogoutPage;

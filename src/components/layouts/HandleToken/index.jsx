import React, { useEffect } from "react";

import axiosClient from "api/axiosClient";
import { AUTH } from "constants/props";
import useAuthSelector from "hooks/selectors/useAuthSelector";

function HandleToken() {
  const { data } = useAuthSelector(AUTH.login);
  useEffect(() => {
    if (data.data.token) {
      axiosClient.defaults.headers.common.Authorization = `Bearer ${data.data.token}`;
      return;
    }

    delete axiosClient.defaults.headers.common.Authorization;
  }, [data.data]);

  return <></>;
}

export default HandleToken;

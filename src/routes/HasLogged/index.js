import { AUTH } from "constants/props";
import useAuthSelector from "hooks/selectors/useAuthSelector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HasLogged = ({ children }) => {
  const { data } = useAuthSelector(AUTH.login);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.data.token) navigate("/");
  }, [data]);

  return children;
};

export default HasLogged;

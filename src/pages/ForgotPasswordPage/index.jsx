import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Button from "components/common/Button";
import Form from "components/common/Form";
import FormField from "components/common/FormField";
import Heading from "components/common/Heading";

import useAuthSelector from "hooks/selectors/useAuthSelector";
import { AUTH } from "constants/props";
import { FORGOT_PASSWORD_API } from "constants/apiPath";

import "./style.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please provide your email!")
    .email("This field must be an email!"),
});

function ForgotPasswordPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { data, onGetMessage, onClear } = useAuthSelector(AUTH.forgotPassword);
  const navigate = useNavigate();

  const handleOnSubmit = (body) => {
    onGetMessage({ url: FORGOT_PASSWORD_API, body });
  };

  useEffect(() => {
    if (data.status === "success") {
      toast.success("Token has been send into your email!");
      navigate("/reset-password");
    }
  }, [data.data]);

  useEffect(() => {
    return () => onClear();
  }, []);

  useEffect(()=>{
    document.title = "Lexe Store | Forgot Password"
  }, []);

  return (
    <div className="forgot-password-page">
      <Form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="forgot-password-page__form"
        message={data.error}
      >
        <Heading
          heading="Forgot Password"
          desc="Lost your password? Please enter your email address. You will receive a link and token to create a new password via email."
        />

        <FormField
          text="Email"
          required
          id="email"
          register={{ ...register("email") }}
          message={errors.email?.message}
        />

        <Button isLoading={data.status === "fetching"}>Send</Button>
      </Form>
    </div>
  );
}

export default ForgotPasswordPage;

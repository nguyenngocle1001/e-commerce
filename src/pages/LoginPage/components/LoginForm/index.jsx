import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuthSelector from "hooks/selectors/useAuthSelector";

import Form from "components/common/Form";
import Button from "components/common/Button";
import FormLink from "components/common/FormLink";
import FormField from "components/common/FormField";
import Heading from "components/common/Heading";

import { LOGIN_API } from "constants/apiPath";
import { AUTH } from "constants/props";

import "./style.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Please provide your email!")
    .email("The field must be an email!"),
  password: yup
    .string()
    .required("Please provide your password!")
    .min(8, "Password must be at least 8 characters"),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { data, onLogin } = useAuthSelector(AUTH.login);

  const handleOnSubmit = (formValue) => {
    onLogin({ url: LOGIN_API, body: formValue });
  };

  return (
    <Form
      className="login-form"
      onSubmit={handleSubmit(handleOnSubmit)}
      message={data.error}
    >
      <Heading
        heading="Registered Customers"
        desc="If you have an account, sign in with your email address."
      />

      <FormField
        id="email"
        text="email"
        required
        placeholder="Input your email..."
        register={{ ...register("email") }}
        message={errors.email && errors.email.message}
      />

      <FormField
        id="password"
        text="password"
        type="password"
        required
        placeholder="Input your password..."
        register={{ ...register("password") }}
        message={errors.password && errors.password.message}
      />

      <FormLink text="Forgot Your Password?" href="/forgot-password" />

      <Button isLoading={data.status === "fetching"}>SIGN IN</Button>
    </Form>
  );
}

export default LoginForm;

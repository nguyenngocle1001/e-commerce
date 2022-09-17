import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "components/common/Button";
import Form from "components/common/Form";
import FormField from "components/common/FormField";

import "./style.scss";
import Heading from "components/common/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";
import useQuery from "hooks/layouts/useQuery";
import useAuthSelector from "hooks/selectors/useAuthSelector";
import { AUTH } from "constants/props";
import { RESET_PASSWORD_API } from "constants/apiPath";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  token: yup.string().required("Please provide a token!"),
  password: yup
    .string()
    .required("Please provide a new password!")
    .min(8, "A password must be at least 8 characters!"),
  confirmPassword: yup
    .string()
    .required("Please provide your confirm password!")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function ResetPasswordPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, onClear, onGetMessage } = useAuthSelector(AUTH.resetPassword);

  const handleOnSubmit = (body) => {
    onGetMessage({ url: RESET_PASSWORD_API, body });
  };

  useEffect(() => {
    setValue("token", searchParams.get("token"));
  }, [searchParams]);

  useEffect(() => {
    document.title = "Lexe Store | Reset Password";
  }, []);

  useEffect(() => {
    if (data.status === "success") {
      toast.success(data.data.message);

      navigate("/login");

      return;
    }

    if (data.status === "failure") {
      toast.error(data.error);

      return;
    }
  }, [data]);

  useEffect(() => {
    return () => onClear();
  }, []);


  return (
    <div className="reset-password-page">
      <Form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="reset-password-page__form"
      >
        <Heading heading="Reset Password" />

        <FormField
          id="token"
          text="Token"
          required
          register={{ ...register("token") }}
          message={errors.token?.message}
        />

        <FormField
          id="password"
          text="New Password"
          required
          register={{ ...register("password") }}
          message={errors.password?.message}
        />
        <FormField
          id="confirmPassword"
          text="Confirm Password"
          required
          register={{ ...register("confirmPassword") }}
          message={errors.confirmPassword?.message}
        />

        <Button type="submit" isLoading={data.status === "fetching"}>
          Reset Password
        </Button>
      </Form>
    </div>
  );
}

export default ResetPasswordPage;

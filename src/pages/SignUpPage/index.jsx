import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AUTH } from "constants/props";
import { SIGNUP_API } from "constants/apiPath";
import useAuthSelector from "hooks/selectors/useAuthSelector";

import Form from "components/common/Form";
import Button from "components/common/Button";
import Heading from "components/common/Heading";
import FormField from "components/common/FormField";

import "./style.scss";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please provide your name!")
    .min(4, "Name must be at least 4 characters!"),
  email: yup
    .string()
    .required("Please provide your email!")
    .email("The field must be an email!"),
  password: yup
    .string()
    .required("Please provide your password!")
    .min(8, "Password must be at least 8 characters!"),
  confirmPassword: yup
    .string()
    .required("Please provide your confirm password!")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function SignUpPage() {
  const { data, onGetMessage, onClear } = useAuthSelector(AUTH.signup);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleOnSubmit = (body) => {
    onGetMessage({ url: SIGNUP_API, body });
  };

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    if (data.status === "success") {
      onClear();
      toast.success("Signup successfully!");
      return navigate("/login");
    }

    if (data.status === "failure") {
      onClear();
      toast.error(data.error);
    }
  }, [data]);

  useEffect(() => {
    document.title = "Lexe Store | Sign Up";
  }, []);

  return (
    <div className="signup-page">
      <div className="container">
        <h1 className="signup-page__heading">Create New Customer Account</h1>
        <Form
          className="signup-page__form"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="signup-page__group">
            <Heading heading="Personal Infomation" />

            <FormField
              id="name"
              text="Name"
              required
              placeholder="Input your name here ..."
              register={{
                ...register("name"),
              }}
              message={errors.name && errors.name.message}
            />

            <FormField
              id="description"
              text="Description"
              type="textarea"
              placeholder="Input your description here ..."
              rows="3"
              register={{ ...register("description") }}
              message={errors.description && errors.description.message}
            />

            <Button
              className="signup-page__btn"
              type="SUBMIT"
              isLoading={data.status === "fetching"}
            >
              CREATE AN ACCOUNT
            </Button>

            <Button
              type="BUTTON"
              className="signup-page__btn"
              className="mobile"
              onClick={handleGoBack}
            >
              BACK
            </Button>
          </div>

          <div className="signup-page__group">
            <Heading heading="Sign-in Information" />

            <FormField
              text="Email"
              id="email"
              required
              register={{ ...register("email") }}
              message={errors.email && errors.email.message}
            />
            <FormField
              text="Password"
              type="password"
              id="password"
              required
              register={{ ...register("password") }}
              message={errors.password && errors.password.message}
            />
            <FormField
              text="Confirm Password"
              type="password"
              id="password"
              required
              register={{ ...register("confirmPassword") }}
              message={errors.confirmPassword && errors.confirmPassword.message}
            />

            <Button type="BUTTON" onClick={handleGoBack} className="min-tablet">
              BACK
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPage;

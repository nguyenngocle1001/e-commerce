import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./style.scss";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("* Please input your email!")
    .email("* This email is not correct!"),
});

function NewsLetter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const handleOnSubmit = (formData) => {
  };

  return (
    <div className="footer-newsletter">
      <h3 className="footer-newsletter__heading">sign up to newsletter</h3>

      <span className="footer-newsletter__desc">
        Sign up for all the news about our latest arrivals and get an exclusive
        early <br /> access shopping. Join 60.000+ Subscribers and get a new
        discount coupon on every Saturday.
      </span>

      <div className="footer-newsletter__email">
        <form
          className="footer-newsletter__email__form"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div className="footer-newsletter__email__form__group">
            <input
              type="text"
              className="footer-newsletter__email__form__control"
              placeholder="Enter your email..."
              {...register("email")}
            />
            <button
              className="footer-newsletter__email__form__btn"
              type="submit"
            >
              SUBSCRIBE
            </button>
          </div>

          {errors.email && (
            <span className="footer-newsletter__email__form__message">
              {errors.email.message}
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;

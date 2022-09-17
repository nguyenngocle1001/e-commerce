import React from "react";
import PropTypes from "prop-types";

import useToggle from "hooks/layouts/useToggle";

import { VscEye, VscEyeClosed } from "react-icons/vsc";

function PasswordField({ register, ...rest }) {
  const [isPassword, setIsPassword] = useToggle(true);

  return (
    <div className="form-field-password">
      <input
        type={isPassword ? "password" : "text"}
        className="form-field__control form-field-password__control"
        {...register}
        {...rest}
      />
      <button
        className="form-field-password__btn"
        type="button"
        onClick={setIsPassword}
      >
        {isPassword ? <VscEye /> : <VscEyeClosed />}
      </button>
    </div>
  );
}

PasswordField.propTypes = {
  register: PropTypes.object,
};

export default PasswordField;

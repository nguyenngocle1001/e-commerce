import React from "react";
import PropTypes from "prop-types";

import { ImSpinner10 } from "react-icons/im";

import "./style.scss";

function Button({
  isLoading,
  children,
  className,
  variant,
  disabled,
  ...rest
}) {
  return (
    <button
      className={`${className} button ${variant}`}
      {...rest}
      disabled={isLoading || disabled}
    >
      {isLoading ? <ImSpinner10 className="button__loading" /> : children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: "",
  isLoading: false,
  variant: "primary",
  disabled: false,
};

export default Button;

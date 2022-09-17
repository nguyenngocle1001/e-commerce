import React from "react";
import PropTypes from "prop-types";

function TextField({ register, ...rest }) {
  return (
    <input
      type="text"
      className="form-field__control"
      {...register}
      {...rest}
    />
  );
}

TextField.propTypes = {
  register: PropTypes.object,
};

export default TextField;

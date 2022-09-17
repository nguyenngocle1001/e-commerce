import React from "react";
import PropTypes from "prop-types";
import TextArea from "antd/lib/input/TextArea";

function TextAreaField({ register, ...rest }) {
  return (
    <textarea
      {...register}
      {...rest}
      className="form-field__textarea"
    ></textarea>
  );
}

TextAreaField.propTypes = {
  id: PropTypes.string.isRequired,
};

export default TextAreaField;

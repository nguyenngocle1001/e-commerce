import React from "react";
import PropTypes from "prop-types";

import FormLabel from "../FormLabel";
import TextField from "./components/TextField";
import PasswordField from "./components/PasswordField";

import "./style.scss";
import Message from "../Message";
import TextAreaField from "./components/TextAreaField";
import DateField from "./components/DateField";

function FormField({ id, register, type, text, required, message, ...rest }) {
  return (
    <div className="form-field">
      <FormLabel text={text} required={required} id={id} />

      {type === "text" && <TextField id={id} {...rest} register={register} />}
      {type === "password" && (
        <PasswordField id={id} {...rest} register={register} />
      )}
      {type === "textarea" && (
        <TextAreaField id={id} {...rest} register={register} />
      )}
      {type === "date" && <DateField id={id} {...rest} register={register} />}

      <Message type="error" text={message} />
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  register: PropTypes.object,
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  message: PropTypes.string,
};

FormField.defaultProps = {
  register: {},
  type: "text",
  required: false,
  placeholder: "Input here...",
  message: "",
};

export default FormField;

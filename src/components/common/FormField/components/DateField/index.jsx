import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";

function DateField(props) {
  return <DatePicker className="form-field__date" {...props} />;
}

export default DateField;

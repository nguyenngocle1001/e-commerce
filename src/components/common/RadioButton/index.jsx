import React from "react";

import "./style.scss";

function RadioButton(props) {
  return <input className="radio-butn" type="radio" {...props} />;
}

export default RadioButton;

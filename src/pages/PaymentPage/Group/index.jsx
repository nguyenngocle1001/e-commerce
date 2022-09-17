import React from "react";
import PropTypes from "prop-types";
import Divider from "components/common/Divider";

import "./style.scss";

function Group({ children, title }) {
  return (
    <div className="payment-page-group">
      <h3 className="payment-page-group__title">{title}</h3>
      <Divider margin="0" />

      <div className="payment-page-group__body">{children}</div>
    </div>
  );
}

Group.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Group;

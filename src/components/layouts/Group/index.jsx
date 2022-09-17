import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function Group({ children, title, buttonText, onClick }) {
  return (
    <div className="group">
      {title && (
        <div className="group__header">
          <h3 className="group__title">{title}</h3>

          {buttonText && (
            <button className="group__btn" onClick={onClick}>
              {buttonText}
            </button>
          )}
        </div>
      )}

      <div className="group__content">{children}</div>
    </div>
  );
}

Group.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
};

Group.defaultProps = {
  title: "",
};

export default Group;

import React, { useRef } from "react";
import PropTypes from "prop-types";

import useToggle from "hooks/layouts/useToggle";
import useOnClickOutside from "hooks/layouts/useOnClickOutside";

import ButtonDropDown from "components/common/ButtonDropDown";
import TabContent from "../TabContent";

function NavDropDown({ text, prop, url }) {
  const [isShow, onShowChange] = useToggle();
  const ref = useRef();

  useOnClickOutside(ref, onShowChange);

  return (
    <div className="navbar-drop-down">
      <ButtonDropDown
        text={text}
        className="navbar__text"
        active={isShow}
        onClick={onShowChange}
      />

      {isShow && (
        <div className="navbar__dropdown" ref={ref}>
          <TabContent prop={prop} apiUrl={url} onClick={onShowChange} />
        </div>
      )}
    </div>
  );
}

NavDropDown.propTypes = {};

export default NavDropDown;

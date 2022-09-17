import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { useLocation } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";

import { BRAND_API, CATEGORY_API } from "constants/apiPath";
import { COMMON } from "constants/props";
import { navbarHeaderType, navbarLinks } from "../constants";

import MenuListing from "components/common/MenuListing";
import MenuMobile from "../components/MenuMobile";
import TabContent from "../components/TabContent";

import "./style.scss";

function NavbarSide({ onClose, className }) {
  const { pathname } = useLocation();
  const [itemActive, setItemActive] = useState(navbarHeaderType[0]);
  const ref = useRef();

  useEffect(() => {
    if (ref.current) onClose();
    else ref.current = "render";
  }, [pathname]);

  return (
    <nav className={`navbar-side ${className}`}>
      <button className="navbar-side__close" onClick={onClose}>
        <span>close</span>
        <RiCloseFill className="navbar-side__close__icon" />
      </button>

      <MenuMobile
        data={navbarHeaderType}
        onClick={setItemActive}
        itemActive={itemActive}
      />

      <div className="navbar-side__content">
        {itemActive.id === 0 && (
          <MenuListing
            className="navbar-side__tab navbar-side__tab--menu"
            data={navbarLinks}
          />
        )}
        {itemActive.id === 1 && (
          <TabContent
            className="navbar-side__tab"
            prop={COMMON.navCategory}
            apiUrl={CATEGORY_API}
          />
        )}
        {itemActive.id === 2 && (
          <TabContent
            className="navbar-side__tab"
            prop={COMMON.navBrand}
            apiUrl={BRAND_API}
          />
        )}
      </div>
    </nav>
  );
}

NavbarSide.propTypes = {
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

NavbarSide.defaultProps = {
  className: "",
};

export default NavbarSide;

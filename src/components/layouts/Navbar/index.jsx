import ButtonDropDown from "components/common/ButtonDropDown";
import { BRAND_API, CATEGORY_API } from "constants/apiPath";
import { COMMON } from "constants/props";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavDropDown from "./components/NavDropDown";
import { navbarLinks } from "./constants";

import "./style.scss";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__container">
          <ul className="navbar__list">
            <li className="navbar__item">
              <NavDropDown
                text="categories"
                prop={COMMON.navCategory}
                url={CATEGORY_API}
              />
            </li>

            <li className="navbar__item">
              <NavDropDown
                text="brands"
                prop={COMMON.navBrand}
                url={BRAND_API}
              />
            </li>
            {navbarLinks.map((link, index) => (
              <li className="navbar__item" key={index}>
                <NavLink className="navbar__link" to={link.href}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <span className="navbar__highlight">LIMITED TIME OFFER !</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

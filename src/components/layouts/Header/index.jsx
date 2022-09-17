import React from "react";
import logo from 'assets/images/logo.png'

import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

import Cart from "./components/Cart";
import Search from "./components/Search";

import "./style.scss";

function Header({ onMenuMobileClick }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <button className="header__nav-toggle" onClick={onMenuMobileClick}>
            <AiOutlineMenu className="header__nav-toggle__icon" />
          </button>

          <Link to="/" className="header__logo">
            <img
              src={logo}
              alt=""
            />
          </Link>

          <Search className="header__search" />

          <Cart />
        </div>
      </div>
    </header>
  );
}

export default Header;

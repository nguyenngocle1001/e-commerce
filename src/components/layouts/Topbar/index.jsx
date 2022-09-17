import { AUTH } from "constants/props";
import useAuthSelector from "hooks/selectors/useAuthSelector";
import React from "react";
import { NavLink } from "react-router-dom";
import User from "../User";

import "./style.scss";

function Topbar() {
  const { data } = useAuthSelector(AUTH.login);

  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar__container">
          <p className="topbar__message">
            Due to the <strong>COVID-19</strong> epidemic, orders may be
            processed with a slight delay.
          </p>

          <ul className="topbar__menu">
            <li className="topbar__menu__item">
              <NavLink to="/location" className="topbar__menu__link">
                Location
              </NavLink>
            </li>
            {data.data.token ? (
              <li className="topbar__menu__item">
                <User />
              </li>
            ) : (
              <>
                <li className="topbar__menu__item">
                  <NavLink to="/login" className="topbar__menu__link">
                    Login
                  </NavLink>
                </li>
                <li className="topbar__menu__item">
                  <NavLink to="/signup" className="topbar__menu__link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Topbar;

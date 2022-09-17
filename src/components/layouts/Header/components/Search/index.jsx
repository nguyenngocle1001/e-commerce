import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import { BiSearch } from "react-icons/bi";
import Button from "components/common/Button";
import "./style.scss";

function Search({ className }) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleOnSearch = () => {
    if (!searchValue) return;
    navigate(`/products?q=${searchValue}`);
    setSearchValue("");
  };

  return (
    <div className={`${className} header-search`}>
      <input
        type="text"
        className="header-search__control"
        placeholder="Search entire store here"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <Button className="header-search__btn" onClick={handleOnSearch}>
        <BiSearch className="header-search__btn__icon" />
      </Button>
    </div>
  );
}

Search.propTypes = {
  className: PropTypes.string,
};

Search.defaultProps = {
  className: "",
};

export default Search;

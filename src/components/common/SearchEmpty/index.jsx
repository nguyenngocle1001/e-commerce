import React from "react";

import SearchEmptyImage from "assets/images/empty.png";

import Button from "../Button";

import "./style.scss";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchEmpty() {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();

  const handleOnBackToHome = () => {
    navigate("/");
  };

  const handleOnClearFilter = () => {
    setSearchParams({});
  };

  return (
    <div className="search-empty">
      <img src={SearchEmptyImage} alt="search empty" />
      <h1 className="search-empty__heading">Not found data</h1>
      <div className="search-empty__btn-group">
        <Button className="search-empty__btn" onClick={handleOnBackToHome}>
          Back To Home
        </Button>
        <Button className="search-empty__btn" onClick={handleOnClearFilter}>
          Clear Filter
        </Button>
      </div>
    </div>
  );
}

export default SearchEmpty;

import React from "react";
import { useSearchParams } from "react-router-dom";
import { GoLightBulb } from "react-icons/go";

import "./style.scss";

function SearchValue() {
  const [searchParams] = useSearchParams();

  if (!searchParams.get("q")) return <></>;
  return (
    <div className="search-value">
      <GoLightBulb className="search-value__icon" />
      <span className="search-value__label">
        Search result for '<strong>{searchParams.get("q")}</strong> '
      </span>
    </div>
  );
}

export default SearchValue;

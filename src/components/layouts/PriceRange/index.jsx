import React, { useState } from "react";

import { useSearchParams } from "react-router-dom";

import Button from "components/common/Button";
import Message from "components/common/Message";

import "./style.scss";

function PriceRange() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState({
    min: searchParams.get("min") || 0,
    max: searchParams.get("max") || 0,
  });

  const handleOnChange = (e) => {
    if (!isNaN(e.target.value) && /\d/.test(e.target.value))
      return setPrice({ ...price, [e.target.name]: e.target.value * 1 });
    if (!e.target.value) return setPrice({ ...price, [e.target.name]: 0 });
  };

  const handleOnApply = () => {
    if (price.min < price.max) {
      setSearchParams({ ...Object.fromEntries([...searchParams]), ...price });
    }
  };

  return (
    <div className="price-range">
      <div className="price-range__group">
        <input
          className="price-range__control"
          name="min"
          placeholder="Min price"
          onChange={handleOnChange}
          value={price.min}
        />
        -
        <input
          className="price-range__control"
          name="max"
          placeholder="Max price"
          onChange={handleOnChange}
          value={price.max}
        />
      </div>

      {price.min >= price.max && price.min !== 0 && price.max !== 0 && (
        <Message
          text="* Please enter the appropriate price range"
          type="error"
        />
      )}

      <Button className="price-range__btn" onClick={handleOnApply}>
        Apply
      </Button>
    </div>
  );
}

export default PriceRange;

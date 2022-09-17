import React from "react";
import { Rate } from "antd";

import "./style.scss";
import { useSearchParams } from "react-router-dom";

const ratings = [
  {
    value: 5,
  },
  {
    value: 4,
    isMin: true,
  },

  {
    value: 3,
    isMin: true,
  },
  {
    value: 2,
    isMin: true,
  },

  {
    value: 1,
    isMin: true,
  },
  {
    value: 0,
    isMin: true,
  },
];

function FilterRating() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnRatingClick = (rating) => {
    setSearchParams({ ...Object.fromEntries([...searchParams]), rating });
  };

  return (
    <div className="filter-rating">
      {ratings.map((rating, index) => (
        <div
          className={`filter-rating__item${
            searchParams.get("rating") == rating.value ? " active" : ""
          }`}
          onClick={() => handleOnRatingClick(rating.value)}
          key={index}
        >
          <Rate value={rating.value} disabled />
          {rating.isMin && (
            <span className="filter-rating__label">or more</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default FilterRating;

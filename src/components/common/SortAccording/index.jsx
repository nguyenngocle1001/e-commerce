import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

import "./style.scss";

function SortAccording() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnClick = (sort) => {
    if (!sort)
      return setSearchParams({
        ...Object.fromEntries(
          [...searchParams].filter((item) => item[0] !== "sort")
        ),
      });
    setSearchParams({ ...Object.fromEntries([...searchParams]), sort });
  };

  return (
    <div className="sort-according">
      <span className="sort-according__label">Sort by</span>

      <ul className="sort-according__list">
        <li className="sort-according__item">
          <button
            className="sort-according__btn active"
            disabled={!searchParams.get("sort")}
            onClick={() => handleOnClick()}
          >
            Involve
          </button>
        </li>

        <li className="sort-according__item">
          <button
            className="sort-according__btn"
            disabled={searchParams.get("sort") === "-createdAt"}
            onClick={() => handleOnClick("-createdAt")}
          >
            Lasted
          </button>
        </li>

        <li className="sort-according__item">
          <button
            className="sort-according__btn"
            disabled={searchParams.get("sort") === "-ratingsAverage"}
            onClick={() => handleOnClick("-ratingsAverage")}
          >
            Selling
          </button>
        </li>

        <li className="sort-according__item sort-according__item--dropdown">
          <button
            className="sort-according__btn sort-according__btn--dropdown"
            disabled={["sellPrice", "-sellPrice"].includes(
              searchParams.get("sort")
            )}
          >
            Price
            <IoIosArrowDown className="sort-according__btn__icon" />
          </button>

          <div className="sort-according__price">
            <button
              className="sort-according__price__btn"
              disabled={searchParams.get("sort") === "sellPrice"}
              onClick={() => handleOnClick("sellPrice")}
            >
              Price: Low to High
            </button>
            <button
              className="sort-according__price__btn"
              disabled={searchParams.get("sort") === "-sellPrice"}
              onClick={() => handleOnClick("-sellPrice")}
            >
              Price: High to Low
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SortAccording;

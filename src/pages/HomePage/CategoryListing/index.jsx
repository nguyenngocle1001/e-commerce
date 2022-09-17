import React, { useEffect, useState } from "react";

import { CATEGORY_API } from "constants/apiPath";
import { COMMON } from "constants/props";

import useCommonSelector from "hooks/selectors/useCommonSelector";

import Category from "../Category";

import Divider from "components/common/Divider";
import Group from "components/layouts/Group";

import "./style.scss";
import { Col, Row } from "antd";

function CategoryListing() {
  const { data, onGetRequest } = useCommonSelector(COMMON.category);
  const [params, setParams] = useState({ page: 1, limit: 8 });
  const [totalPages, setTotalPages] = useState(0);

  const handleLoadMore = () => {
    setParams({ ...params, page: params.page + 1 });
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    onGetRequest({ url: CATEGORY_API, params });
  }, [params]);

  useEffect(() => {
    if (!data.data.docs) return;

    const result = data.data.docs.reduce((acc, cur) => {
      if (acc.length === 0 || acc[acc.length - 1].length === 2) {
        return [...acc, [cur]];
      }

      acc[acc.length - 1].push(cur);

      return acc;
    }, []);

    setCategories(result);

    const { limit, totalRows } = data.data.pagination;
    const pageCount = Math.ceil(totalRows / limit);
    if (totalPages !== pageCount) setTotalPages(pageCount);
  }, [data.data]);

  return (
    <Group
      title="categories"
      onClick={handleLoadMore}
      buttonText={totalPages > params.page ? "More" : ""}
    >
      {/* <ul className="category-listing">
        {categories.map((category, index) => (
          <li className="category-listing__item" key={index}>
            <Category {...category[0]} />
            <Divider />
            <Category {...category[1]} />
          </li>
        ))}
      </ul> */}
      <Row
        gutter={1}
        style={{
          rowGap: 1,
          backgroundColor: "var(--border-light-color)",
          paddingTop: 1,
        }}
      >
        {data.data?.docs?.map((category, index) => (
          <Col key={index} xl={6} md={8} sm={8} xs={12}>
            <div className="category-listing__item">
              <Category {...category} />
            </div>
          </Col>
        ))}
      </Row>
    </Group>
  );
}

export default CategoryListing;

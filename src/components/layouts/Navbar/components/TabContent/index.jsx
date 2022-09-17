import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import useCommonSelector from "hooks/selectors/useCommonSelector";
import { COMMON } from "constants/props";

import LoadMoreButton from "components/common/LoadMoreButton";
import MenuListing from "components/common/MenuListing";
import Divider from "components/common/Divider";

import "./style.scss";

function TabContent({ prop, apiUrl, className, onClick }) {
  const { data, onGetRequest } = useCommonSelector(prop);
  const [params, setParams] = useState({ page: 1, limit: 5 });
  const [isLoadMore, setIsLoadMore] = useState(false);

  const handleOnLoadMore = () => {
    setParams({ ...params, page: params.page + 1 });
  };

  useEffect(() => {
    onGetRequest({ url: apiUrl, params });
  }, [params]);

  useEffect(() => {
    if (data.data.pagination) {
      const { page, limit, totalRows } = data.data.pagination;
      const totalPage = Math.ceil(totalRows / limit);

      if (totalPage > page) return setIsLoadMore(true);
    }
    if (isLoadMore) setIsLoadMore(false);
  }, [data]);

  return (
    <div className={`navbar-tab-content ${className}`}>
      <MenuListing
        onClick={onClick}
        data={
          (data.data.docs &&
            data.data.docs.map((item) => ({
              href:
                prop === COMMON.navBrand
                  ? `products?brand=${item.id}`
                  : `products?category=${item.id}`,
              label: item.name.toLowerCase(),
            }))) ||
          []
        }
        isNavLink={false}
      />

      {isLoadMore && (
        <>
          <Divider margin="8px 0" />
          <LoadMoreButton onClick={handleOnLoadMore} />
        </>
      )}
    </div>
  );
}

TabContent.propTypes = {
  prop: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

TabContent.defaultProps = {
  className: "",
  onClick: () => {},
};

export default TabContent;

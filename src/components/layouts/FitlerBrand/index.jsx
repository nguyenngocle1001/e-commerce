import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Checkbox from "antd/lib/checkbox/Checkbox";

import useCommonSelector from "hooks/selectors/useCommonSelector";
import { COMMON } from "constants/props";
import { BRAND_API } from "constants/apiPath";

import "./style.scss";

function FilterBrand() {
  const { data, onGetRequest } = useCommonSelector(COMMON.brandFitler);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChange = (brand) => {
    if (searchParams.get("brand") === brand)
      return setSearchParams(
        Object.fromEntries(
          [...searchParams].filter((item) => item[0] !== "brand")
        )
      );
    setSearchParams({ ...Object.fromEntries([...searchParams]), brand });
  };

  useEffect(() => {
    onGetRequest({ url: `${BRAND_API}/with-product` });
  }, []);

  if (!data.data.docs) return <>loading</>;
  return (
    <div className="filter-brand">
      {data.data.docs.map((doc) => (
        <Checkbox
          onChange={() => handleOnChange(doc.id)}
          key={doc.id}
          checked={doc.id === searchParams.get("brand")}
        >
          {doc.name} ({doc.count})
        </Checkbox>
      ))}
    </div>
  );
}

export default FilterBrand;

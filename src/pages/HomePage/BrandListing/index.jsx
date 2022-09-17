import React, { useEffect, useState } from "react";

import { BRAND_API } from "constants/apiPath";
import { COMMON } from "constants/props";

import useCommonSelector from "hooks/selectors/useCommonSelector";

import Brand from "../Brand";

import Divider from "components/common/Divider";
import Group from "components/layouts/Group";

import "./style.scss";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";

const settings = {
  dots: false,
  infinite: true,
  speed: 2500,
  slidesToShow: 3,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

function BrandListing() {
  const { data, onGetRequest } = useCommonSelector(COMMON.brand);

  useEffect(() => {
    onGetRequest({ url: BRAND_API });
  }, []);

  return (
    <Group title="Brands">
      <Divider margin="0" />
      {data.status === "fetching" && <Skeleton height={120} />}
      <Slider {...settings} autoplay>
        {data.data?.docs?.map((brand, index) => (
          <Brand {...brand} key={index} />
        ))}
      </Slider>
    </Group>
  );
}

export default BrandListing;

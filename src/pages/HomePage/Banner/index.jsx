import React, { useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";

import useCommonSelector from "hooks/selectors/useCommonSelector";
import { COMMON } from "constants/props";
import { BANNER_API } from "constants/apiPath";

import BannerItem from "../BannerItem";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

function Banner() {
  const { data, onGetRequest } = useCommonSelector(COMMON.banner);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  useEffect(() => {
    onGetRequest({
      url: `${BANNER_API}/now`,
    });
  }, []);

  return (
    <>
      {data.status === "fetching" && <Skeleton height={200} />}

      <Slider {...settings}>
        {data.data.docs?.map((item) => (
          <BannerItem {...item} key={item.id} />
        ))}
      </Slider>
    </>
  );
}

export default Banner;

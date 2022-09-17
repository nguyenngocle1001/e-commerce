import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Image } from "antd";

import "./style.scss";

function Images({ images }) {
  const [imageSelected, setImageSelected] = useState(images[0]);
  
  useEffect(() => {
    setImageSelected(images[0]);
  }, [images]);

  return (
    <div className="detail-page-images">
      <div className="detail-page-images__nav">
        {images.map((image, index) => (
          <img
            src={image}
            alt="images"
            key={index}
            onClick={() => setImageSelected(image)}
            className={`detail-page-images__nav-img${
              image === imageSelected ? " active" : ""
            } `}
          />
        ))}
      </div>

      <div className="detail-page-images__main">
        <Image src={imageSelected} alt="image main" />
      </div>
    </div>
  );
}

Images.propTypes = {
  images: PropTypes.array.isRequired,
};

export default React.memo(Images);

import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";

import useCartSelector from "hooks/selectors/useCartSelector";

import Button from "components/common/Button";
import ColorCircle from "components/common/ColorCircle";

import useDetailSelector from "hooks/selectors/useDetailSelector";
import { AUTH, DETAIL } from "constants/props";
import { PRODUCT_OPTIONS_API } from "constants/apiPath";

import "./style.scss";
import useAuthSelector from "hooks/selectors/useAuthSelector";
import { toast } from "react-toastify";

function InputQuantity({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { data: auth } = useAuthSelector(AUTH.login);
  const { onAddToCart } = useCartSelector();
  const { data, onGetDetailMany } = useDetailSelector(DETAIL.options);

  const [selectedOption, setSelectedOption] = useState();

  const handleOnSubmit = () => {
    if (!auth.data.token) return toast.error("Please login first!");
    if (!selectedOption) return toast.error("Please choose an option!");

    onAddToCart({
      product: product.id,
      color: selectedOption.color.id,
      size: selectedOption.size.id,
      quantity,
    });
    setQuantity(1);
  };

  useEffect(() => {
    onGetDetailMany({ url: `${PRODUCT_OPTIONS_API}/${product.id}/product` });
  }, []);

  useEffect(() => {
    setQuantity(1);
  }, [selectedOption]);

  return (
    <>
      <div className="detail-option">
        <button className="detail-option__item">
          {selectedOption ? (
            <>
              {selectedOption.size.value}
              <ColorCircle color={selectedOption.color.value} />
            </>
          ) : (
            "Choose one option"
          )}
        </button>
        <div className="detail-option__list">
          {data.data.docs &&
            data.data.docs.map((doc) => (
              <button
                key={doc.id}
                className="detail-option__item"
                onClick={() => setSelectedOption(doc)}
                disabled={selectedOption && doc.id === selectedOption.id}
              >
                {doc.size.value}
                <ColorCircle color={doc.color.value} />
              </button>
            ))}
        </div>
      </div>

      <div className="input-quantity">
        <InputNumber
          min={1}
          max={selectedOption ? selectedOption.quantity : product.quantity}
          value={quantity}
          onChange={setQuantity}
          className="input-quantity__control"
          disabled={product.quantity === 0}
        />

        <Button
          className="input-quantity__btn"
          onClick={handleOnSubmit}
          disabled={product.quantity === 0}
        >
          Add To Card
        </Button>
      </div>
    </>
  );
}

export default InputQuantity;

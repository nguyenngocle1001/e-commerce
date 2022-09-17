import React, { useEffect } from "react";
import { Col, Row } from "antd";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Heading from "components/common/Heading";
import FormField from "components/common/FormField";
import Group from "./Group";

import Button from "components/common/Button";
import useAuthSelector from "hooks/selectors/useAuthSelector";
import { ACTION, AUTH } from "constants/props";
import useActionSelector from "hooks/selectors/useActionSelector";
import { ORDER_API } from "constants/apiPath";
import useCartSelector from "hooks/selectors/useCartSelector";
import NoItem from "components/common/NoItem";
import { toast } from "react-toastify";
import "./style.scss";

const schema = yup.object().shape({
  email: yup.string().email("This field must be an email!"),
  name: yup.string().required("Please provide a name!"),
  address: yup.string().required("Please provide an address!"),
  phone: yup
    .string()
    .required("Please provide a phone!")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "This field must be a phone"
    ),
});

function PaymentPage() {
  const { data } = useAuthSelector(AUTH.login);
  const {
    data: order,
    onPostAction,
    onClear,
  } = useActionSelector(ACTION.order);
  const { data: cart, onGetCart } = useCartSelector();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: data.data.user.email,
      name: data.data.user.name,
      address: data.data.user.address,
      phone: data.data.user.phone,
    },
  });

  const handleOnSubmit = (body) => {
    onPostAction({ url: ORDER_API, body });
  };

  useEffect(() => {
    onGetCart();
  }, [order]);

  useEffect(() => {
    if (order.status === "success") {
      toast.success("Your order has been successfully placed ");
    }
  }, [order]);

  useEffect(() => {
    document.title = "Lexe Store | Payment";

    return () => onClear();
  }, []);

  return (
    <div className="payment-page">
      <div className="container">
        <div className="payment-page__container">
          <Heading
            heading="Express Checkout"
            desc="Please enter your details below to complete your purchased"
          />

          {order.status === "success" && cart?.data?.products?.length === 0 ? (
            <NoItem />
          ) : (
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <Row gutter={30}>
                <Col xl={8}>
                  <Group title="Shipping Address">
                    <FormField
                      text="Email Address"
                      id="email"
                      placeholder="Eg: example@gmail.com"
                      register={{ ...register("email") }}
                      message={errors.email?.message}
                    />
                    <FormField
                      required
                      text="Name"
                      id="name"
                      placeholder="Eg: Nguyen Ngoc Le"
                      register={{ ...register("name") }}
                      message={errors.name?.message}
                    />
                    <FormField
                      required
                      text="Address"
                      id="address"
                      placeholder="Eg: KP. Phu Hiep 1,..."
                      register={{ ...register("address") }}
                      message={errors.address?.message}
                    />
                    <FormField
                      required
                      text="Phone Number"
                      id="phone"
                      placeholder="Eg: 0919xxxxxx"
                      register={{ ...register("phone") }}
                      message={errors.phone?.message}
                    />
                    <FormField
                      text="Note"
                      id="note"
                      type="textarea"
                      placeholder="Something here..."
                      register={{ ...register("note") }}
                    />
                  </Group>
                </Col>

                <Col xl={8}>
                  <Group title="Payment Methods">
                    <FormField
                      required
                      text="Credit Card Number"
                      id="cardNumber"
                      placeholder="Credit card number"
                      disabled
                    />
                    <FormField
                      required
                      type="date"
                      text="Expiration Date"
                      id="expirationDate"
                      disabled
                    />
                    <FormField
                      required
                      type="text"
                      text="Card Verification Number"
                      id="verificationNumber"
                      placeholder="Eg: 1234"
                      disabled
                    />
                  </Group>
                </Col>

                <Col xl={8}>
                  <Group title="Order Summary">
                    <Button
                      type="submit"
                      isLoading={order.status === "fetching"}
                    >
                      ORDER
                    </Button>
                  </Group>
                </Col>
              </Row>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;

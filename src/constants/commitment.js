import { MdOutlineDeliveryDining, MdPayment } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";

const commitment = [
  {
    id: 1,
    title: "FAST DELIVERY",
    desc: "We ship to over 200 countries & regions.",
    icon: <MdOutlineDeliveryDining />,
  },
  {
    id: 2,
    title: "SAFE PAYMENT",
    desc: "Pay with the world’s most popular, secure payment methods.",
    icon: <MdPayment />,
  },
  {
    id: 3,
    title: "24/7 HELP CENTER",
    desc: "Round-the-clock assistance for a smooth shopping experience.",
    icon: <IoChatbubblesOutline />,
  },
  {
    id: 4,
    title: "SHOP WITH CONFIDENCE",
    desc: "Money back up to 60 days, commitment to outstanding quality products.",
    icon: <GiReceiveMoney />,
  },
];

export default commitment;

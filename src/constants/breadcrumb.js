import { AiOutlineHome } from "react-icons/ai";

const breadcrumbs = {
  products: [
    {
      label: "home",
      href: "/",
    },
    {
      label: "products",
      current: true,
    },
  ],
  detailProduct: (label) => [
    {
      label: "home",
      href: "/",
    },
    {
      label: "products",
      href: "/products",
    },
    {
      label,
      current: true,
    },
  ],
};
export default breadcrumbs;

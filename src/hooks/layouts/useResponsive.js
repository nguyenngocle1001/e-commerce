import useWindowSize from "./useWindowSize";

const mobile = 740;
const tablet = 1024;

const useResponsive = () => {
  const { width } = useWindowSize();

  if (width < mobile) return "mobile";
  if (width < tablet) return "tablet";
  return "pc";
};

export default useResponsive;

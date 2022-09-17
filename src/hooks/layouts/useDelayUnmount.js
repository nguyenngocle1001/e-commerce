import { useEffect, useState } from "react";

function useDelayUnmount(isMounted, delay) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delay);
    }

    return () => clearTimeout(timeoutId);
  });

  return shouldRender;
}

export default useDelayUnmount;

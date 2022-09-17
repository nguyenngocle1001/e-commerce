import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useLocationChange = (callback) => {
  const ref = useRef();
  const location = useLocation();

  useEffect(() => {
    if (ref.current) return callback();

    ref.current = true;
  }, [location]);
};

export default useLocationChange;

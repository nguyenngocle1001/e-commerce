import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  const get = useCallback((name) => searchParams.get(name), []);
  const getAll = () => Object.fromEntries([...searchParams]);

  const clear = setSearchParams({});
  const set = useCallback((params) => setSearchParams(params), []);

  return { get, getAll, clear, set };
};

export default useQuery;

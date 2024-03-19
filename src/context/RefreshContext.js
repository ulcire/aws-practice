"use client";
import { createContext, useContext, useState, useCallback } from "react";

const RefreshContext = createContext({
  refresh: () => {},
  triggerRefresh: () => {},
});

export const useRefresh = () => useContext(RefreshContext);

export const RefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <RefreshContext.Provider value={{ refresh: refreshKey, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

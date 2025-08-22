"use client";
import { createContext, useState, useContext } from "react";

// Create context
const GlobalContext = createContext();

// Create a rovider
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hooks to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}

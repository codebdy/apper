import { IApp } from "model";
import { createContext, useContext } from "react";

export const AppContext = createContext<IApp | undefined>(undefined)

export function useApp() {
  return useContext(AppContext)
}
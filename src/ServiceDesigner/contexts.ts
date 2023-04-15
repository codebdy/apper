import { IService } from "model";
import { createContext, useContext } from "react";

export const ServiceContext = createContext<IService | undefined>(undefined)

export function useService() {
  return useContext(ServiceContext)
}
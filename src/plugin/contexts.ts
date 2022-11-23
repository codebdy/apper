import { createContext, useContext } from "react";
import { IPlugin } from "plugin-sdk";

export interface IPredefinedPlugins {
  basicPlugins: IPlugin[],
  frameworkPlugins: IPlugin[],
}

export const PredefinedPluginsContext = createContext<IPredefinedPlugins>({ basicPlugins: [], frameworkPlugins: [] });

export const usePredefinedPlugins = (): IPredefinedPlugins => useContext(PredefinedPluginsContext);


import { IPlugin } from "plugin-sdk";
import { IPluginInfo } from "../model";


export enum PluginStatus {
  Loading = "loading",
  Error = "error",
  Normal = "normal"
}

export interface IInstalledPlugin {
  pluginInfo: IPluginInfo;
  plugin?: IPlugin;
  status: PluginStatus;
}

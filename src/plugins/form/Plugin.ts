import { IPlugin } from "plugin-sdk";
import { locales } from "./loacales";
import components from "./components";

export const rxPlugin: IPlugin = {
  id: "predefined.Inputs",
  title: "Inputs",
  version: "1.0",
  description: "Description",
  components: components,
  model: undefined,
  locales
}
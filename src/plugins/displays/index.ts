import { IPlugin } from "plugin-sdk";
import { rxPlugin } from "./Plugin";

//export * from "./ProLayout"

declare const window: Window & { rxPlugin: IPlugin };
(function () {
  window.rxPlugin = rxPlugin
  console.log("Display plugin 中 ")
})()

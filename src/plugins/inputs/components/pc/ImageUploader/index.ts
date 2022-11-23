import { IMaterialComponent } from "plugin-sdk";
import Name from "./name";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Component from "./view";

const material:IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: Component,
  behaviors,
  resources
}

export default material;
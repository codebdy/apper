import { FormTabDesigner } from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "plugin-sdk";
import Component from "./view";

const material: IMaterialComponent = {
  name: Name,
  designer: FormTabDesigner,
  component: Component,
  behaviors,
  resources
}

export default material;

import { IMaterialComponent } from "plugin-sdk";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import FormGridDesigner from "./designer";
import { FormGrid } from "formily/antd4";

const material:IMaterialComponent = {
  name: Name,
  designer: FormGridDesigner,
  component: FormGrid,
  behaviors,
  resources
}

export default material;
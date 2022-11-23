import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { IMaterialComponent } from "plugin-sdk";
import { ArrayTableDesigner } from "./designer";
import { ArrayTable } from "formily/antd4";

const material: IMaterialComponent = {
  name: Name,
  designer: ArrayTableDesigner,
  component: ArrayTable,
  behaviors,
  resources
}

export default material;

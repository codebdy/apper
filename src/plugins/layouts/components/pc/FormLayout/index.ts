import { IMaterialComponent } from "plugin-sdk";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { FormLayout } from 'formily/antd4'
import FormLayoutDesigner from "./designer";

const material:IMaterialComponent = {
  name: Name,
  designer: FormLayoutDesigner,
  component: FormLayout,
  behaviors,
  resources
}

export default material;
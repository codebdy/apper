import { IMaterialComponent } from "plugin-sdk";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { DatePicker } from 'formily/antd4'

const material:IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: DatePicker,
  behaviors,
  resources
}

export default material;
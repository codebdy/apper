import { IMaterialComponent } from "plugin-sdk";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { NumberPicker } from 'formily/antd4'

const material:IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: NumberPicker,
  behaviors,
  resources
}

export default material;
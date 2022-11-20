import { IMaterialComponent } from "@rxdrag/appx-plugin-sdk";
import ComponentDesigner from "./designer";
import behaviors from "./designer/behaviors";
import resources from "./designer/resources";
import Name from "./name";
import { Password } from '@formily/antd'

const material:IMaterialComponent = {
  name: Name,
  designer: ComponentDesigner,
  component: Password,
  behaviors,
  resources
}

export default material;
import Name from "../name";
import { IResourceCreator } from "designable/core";

const resources: IResourceCreator[] = [{
  icon: 'NotificationSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': Name,
        'x-component-props': {
        },
      },
    },
  ],
}]

export default resources;
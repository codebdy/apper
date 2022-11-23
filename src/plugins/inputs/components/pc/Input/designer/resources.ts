import { IResourceCreator } from "designable/core";
import Name, { TextAreaName } from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'InputSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: Name,
          'x-decorator': 'FormItem',
          'x-component': Name,
        },
      },
    ],
  },
  {
    icon: 'TextAreaSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'string',
          title: TextAreaName,
          'x-decorator': 'FormItem',
          'x-component': TextAreaName,
        },
      },
    ],
  }
]

export default resources;
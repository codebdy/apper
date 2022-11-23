import { IResourceCreator } from "designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'NumberPickerSource',
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
]

export default resources;
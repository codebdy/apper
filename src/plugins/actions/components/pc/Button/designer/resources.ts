import { IResourceCreator } from "designable/core";
import Name from "../name";

const resources: IResourceCreator[] = [
  {
    icon: 'ButtonSource',
    elements: [
      {
        componentName: Name,
        props: {
          type: "primary",
          title: "Button"
        },
      },
    ],
  }
]

export default resources;
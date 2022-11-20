import FormButtonGroup, { IFormButtonGroupProps } from "../view";
import { observer } from '@formily/reactive-react';
import { DnFC, DroppableWidget } from "designable/react";

const FormButtonGroupDesigner: DnFC<IFormButtonGroupProps> = observer((props) => {
  const { sticky, children, ...others } = props;

  return (
    props.children
      ?
      <FormButtonGroup {...others}>
        {children}
      </FormButtonGroup>
      :
      <DroppableWidget >
        {children as any}
      </DroppableWidget>
  )
});

export default FormButtonGroupDesigner;

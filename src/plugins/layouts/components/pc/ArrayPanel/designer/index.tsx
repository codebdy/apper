import {
  DnFC,
  DroppableWidget,
  useTreeNode,
  TreeNodeWidget
} from 'designable/react'
import { observer } from '@formily/reactive-react'
import { IArrayPanelProps } from '../view'
import { queryNodesByComponentPath } from 'designable/formily-antd/shared';


export const ArrayPanelDesigner: DnFC<IArrayPanelProps> = observer((props: IArrayPanelProps) => {
  const { value, onChange, ...other } = props;
  const node = useTreeNode()

  const children = queryNodesByComponentPath(node, [
    'ArrayPanel',
    '*'
  ])

  return (
    <div
      {...other}
    >
      {children.length ? (
        children.map((node) => (
          <TreeNodeWidget key={node.id} node={node} />
        ))
      ) : (
        <DroppableWidget hasChildren={false} style={{ whiteSpace: "nowrap" }}/>
      )}
    </div>
  )
})

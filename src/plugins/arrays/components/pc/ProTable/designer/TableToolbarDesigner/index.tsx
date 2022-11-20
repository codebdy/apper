import React from "react"
import './locales'
import './schema'
import { DnFC, useTreeNode, TreeNodeWidget } from 'designable/react'
import { observer } from "@formily/reactive-react"
import { TableToolbar } from "../../view/TableToolbar"
import { TableToolbarShell } from "../../view/TableToolbar/TableToolbarShell"
import { findNodeByComponentPath } from "designable/formily-antd/shared"

export const TableToolbarDesigner: DnFC<React.ComponentProps<typeof TableToolbar>> = observer((props) => {
  const { hasActions = true, ...other } = props;
  const node = useTreeNode()

  const actions = findNodeByComponentPath(node, [
    'ProTable.Toolbar',
    'ProTable.ToolbarActions',
  ])

  return (
    <TableToolbarShell
      {...other}
      actions={hasActions && actions && <TreeNodeWidget node={actions} />}
    >
      {
        node?.children?.filter(child => child.id !== actions?.id).map(child => {
          return <TreeNodeWidget key={child.id} node={child} />
        })
      }
    </TableToolbarShell>
  )
})

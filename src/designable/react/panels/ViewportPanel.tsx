import React from 'react'
import { WorkspacePanel, IWorkspaceItemProps } from './WorkspacePanel'
import { Simulator } from '../containers'

const WorkspacePanelItem = WorkspacePanel.Item as any
export const ViewportPanel: React.FC<IWorkspaceItemProps> = (props) => {
  return (
    <WorkspacePanelItem {...props} flexable>
      <Simulator>{props.children}</Simulator>
    </WorkspacePanelItem>
  )
}

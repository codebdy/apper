import React from 'react'
import {
  IResource,
} from '@designable/core'
import { observer } from '@formily/reactive-react'
import './styles.less'
import { Image } from 'plugins/displays/components/pc/Image/view'

export type SourceMapper = (resource: IResource) => React.ReactChild

export interface IResourceNodeWidgetProps {
  source?: IResource;
  imageUrl?: string;
}

export const TemplateNodeWidget: React.FC<IResourceNodeWidgetProps> = observer(
  (props) => {

    const { node, title } = props.source || {}
    return (
      <div
        key={node?.id}
        className="template-card"
        data-designer-source-id={node?.id}
      >
        <Image value={props.imageUrl} />
        <div className={'template-item-text'}>
          {title as any}
        </div>
      </div>
    )
  }
)

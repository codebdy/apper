import React from 'react'
import { Space as FormilySpace } from 'formily/antd4'
import { DnFC } from 'designable/react'
import { withContainer } from 'designable/formily-antd/common/Container';

const ComponentDesigner: DnFC<React.ComponentProps<typeof FormilySpace>> =
  withContainer(FormilySpace)

export default ComponentDesigner;

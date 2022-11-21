import React from 'react'
import { FormLayout as FormilyFormLayout } from 'formily/antd4'
import { DnFC } from 'designable/react'
import { withContainer } from 'designable/formily-antd/common/Container';

const FormLayoutDesigner: DnFC<React.ComponentProps<typeof FormilyFormLayout>> =
  withContainer(FormilyFormLayout)

export default FormLayoutDesigner;

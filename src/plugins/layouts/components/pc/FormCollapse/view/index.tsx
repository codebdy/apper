import { observer } from '@formily/reactive-react'
import { FormCollapse, IFormTabProps } from 'formily/antd4';
//import { useParseLangMessage } from 'plugin-sdk/hooks/useParseLangMessage';
//import React from 'react';

const Component = observer((props: IFormTabProps) => {
  //const { title, ...other } = props;
  //const p = useParseLangMessage();
  const FormCollapseAny = FormCollapse as any
  return (
    <FormCollapseAny
      {...props}
    />
  )
})

export default Component;
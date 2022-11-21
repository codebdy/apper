import { observer } from '@formily/reactive-react'
import { FormTab, IFormTabProps } from '@formily/antd';
import { useParseLangMessage } from 'plugin-sdk/hooks/useParseLangMessage';
import React from 'react';

const Component = observer((props: IFormTabProps) => {
  const { ...other } = props;
  const p = useParseLangMessage();

  return (
    <FormTab
      //title={p(title as any)}
      {...other}
    />
  )
})

export default Component;
import { observer } from "@formily/reactive-react";
import React, { useCallback } from "react";
import { BatchActionsContainer } from "./BatchActionsContainer";
import { useArrayParams } from "plugin-sdk/contexts/array";

export interface ITableBatchActionsProps {
  children?: React.ReactNode
}

export const TableBatchActions = observer((
  props: ITableBatchActionsProps
) => {
  const { children } = props;
  const params = useArrayParams();

  const handleClear = useCallback(() => {
    params.selectedRowKeys = [];
  }, [params])

  return (
    params?.selectedRowKeys?.length
      ? <BatchActionsContainer counts={params?.selectedRowKeys?.length} onClear={handleClear}>
        {children}
      </BatchActionsContainer>
      : <></>
  )
})

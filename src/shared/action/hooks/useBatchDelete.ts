import { useCallback, useRef } from "react";
import { useDeleteByIds } from "enthooks/hooks/useDeleteByIds";
import { useArrayParams } from "plugin-sdk/contexts/array";

export function useBatchDelete() {
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  const tableParams = useArrayParams();
  const { dataBind, selectedRowKeys } = tableParams;
  const [doDelete ] = useDeleteByIds(dataBind?.entityName||"", {
    onCompleted: () => {
      resolveRef.current && resolveRef.current(undefined);
      tableParams.selectedRowKeys = [];
    },
    onError: (error) => {
      rejectRef.current && rejectRef.current(error);
    }
  });

  const batchDelete = useCallback(() => {
    const p = new Promise((resolve, reject) => {
      if (!selectedRowKeys?.length) {
        reject(new Error("No data to delete"));
      }
      resolveRef.current = resolve;
      rejectRef.current = reject;
      doDelete(selectedRowKeys?.map((key:any) => key?.toString()) as any);
    });
    return p;
  }, [doDelete, selectedRowKeys])

  return batchDelete;
}
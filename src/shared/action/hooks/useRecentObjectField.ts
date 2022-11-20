import { GeneralField, isObjectField, ObjectField } from "@formily/core";
import { useCallback, useMemo } from "react";
import { useField } from "@formily/react";

export function useRecentObjectField() {
  const field = useField();
  const getParentObjectField = useCallback((field: GeneralField): ObjectField | undefined => {
    if (field?.parent) {
      if (isObjectField(field.parent)) {
        return field?.parent
      }
      else {
        return getParentObjectField(field?.parent)
      }
    }

    return undefined;
  }, [])

  const formField = useMemo(() => {
    return getParentObjectField(field);
  }, [field, getParentObjectField])

  return formField;
}
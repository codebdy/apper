import { useCallback } from "react";
import { ID } from "shared";
import { ClassMeta } from "../meta/ClassMeta";
import { useChangeClass } from "./useChangeClass";
import { useCreateMethod } from "./useCreateMethod";

export function useCreateClassMethod(metaId: ID) {
  const changeClass = useChangeClass(metaId);
  const createMethod = useCreateMethod(metaId);
  const createClassMethod = useCallback(
    (cls: ClassMeta) => {
      const method = createMethod(cls.methods);

      changeClass({ ...cls, methods: [...cls.methods||[], method] });
    },
    [changeClass, createMethod]
  );

  return createClassMethod;
}

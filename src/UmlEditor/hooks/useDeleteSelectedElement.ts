import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useAttribute } from "./useAttribute";
import { useDeleteAttribute } from "./useDeleteAttribute";
import { useDeleteClass } from "./useDeleteClass";
import { useDeleteRelation } from "./useDeleteRelation";
import { useClass } from "./useClass";
import { useRelation } from "./useRelation";
import { useMethod } from "./useMethod";
import { useDeleteMethod } from "./useDeleteMethod";
import { ID } from "shared";

/**
 * 本方法不需要备份状态
 */
export function useDeleteSelectedElement(metaId: ID) {
  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState(metaId)
  );
  const cls = useClass(selectedElement || "", metaId);
  const deleteClass = useDeleteClass(metaId);
  const relation = useRelation(selectedElement || "", metaId);
  const deleteRelation = useDeleteRelation(metaId);

  const { attribute } = useAttribute(selectedElement || "", metaId);
  const { method } = useMethod(selectedElement || "", metaId);
  const deletedAttribute = useDeleteAttribute(metaId);
  const deleteMethod = useDeleteMethod(metaId);

  const deleteSelectedElement = useCallback(() => {
    if (cls) {
      deleteClass(cls.uuid);
    }
    if (relation) {
      deleteRelation(relation.uuid);
    }

    if (attribute) {
      deletedAttribute(attribute.uuid);
    }

    if (method) {
      deleteMethod(method.uuid);
    }
    setSelectedElement(undefined);
  }, [
    cls,
    relation,
    attribute,
    method,
    setSelectedElement,
    deleteClass,
    deleteRelation,
    deletedAttribute,
    deleteMethod,
  ]);

  return deleteSelectedElement;
}

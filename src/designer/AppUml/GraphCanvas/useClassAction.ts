import { Graph } from "@antv/x6";
import { useCallback, useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { ID } from "shared";
import { useChangeClass } from "../hooks/useChangeClass";
import { useCreateClassAttribute } from "../hooks/useCreateClassAttribute";
import { useCreateClassMethod } from "../hooks/useCreateClassMethod";
import { useDeleteClass } from "../hooks/useDeleteClass";
import { useGetClass } from "../hooks/useGetClass";
import { useHideClassFromDiagram } from "../hooks/useHideClassFromDiagram";
import { selectedElementState } from "../recoil/atoms";
import { ClassEvent } from "./ClassView";

export function useClassAction(graph: Graph | undefined, appId: ID) {
  const getClass = useGetClass(appId);
  const setSelectedElement = useSetRecoilState(
    selectedElementState(appId)
  );
  const changeClass = useChangeClass(appId);
  const createAttribute = useCreateClassAttribute(appId);
  const createMethod = useCreateClassMethod(appId);

  const getClassRef = useRef(getClass);
  getClassRef.current = getClass;
  const hideClass = useHideClassFromDiagram(appId);
  const hideClassRef = useRef(hideClass);
  hideClassRef.current = hideClass;

  const deleteClass = useDeleteClass(appId);
  const deleteClassRef = useRef(deleteClass);
  deleteClassRef.current = deleteClass;
  
  const changeClassRef = useRef(changeClass);
  changeClassRef.current = changeClass;

  const createAttributeRef = useRef(createAttribute);
  createAttributeRef.current = createAttribute;

  const createMothodRef = useRef(createMethod);
  createMothodRef.current = createMethod;

  const handleAttributeSelect = useCallback(
    (attrId: string) => {
      setSelectedElement(attrId);
    },
    [setSelectedElement]
  );

  const handleAttributeDelete = useCallback(
    (classId: string, attrId: string) => {
      const cls = getClassRef.current(classId);
      if (!cls) {
        console.error("Class not exist: " + classId);
        return;
      }
      changeClassRef.current({
        ...cls,
        attributes: cls.attributes.filter((ent) => ent.uuid !== attrId),
      });
    },
    []
  );

  const handleMethodSelect = useCallback(
    (methodId: string) => {
      setSelectedElement(methodId);
    },
    [setSelectedElement]
  );

  const handleMothodDelete = useCallback(
    (classId: string, methodId: string) => {
      const cls = getClassRef.current(classId);
      if (!cls) {
        console.error("Class not exist: " + classId);
        return;
      }
      changeClassRef.current({
        ...cls,
        methods: cls.methods.filter((cls) => cls.uuid !== methodId),
      });
    },
    []
  );

  const handleAttributeCreate = useCallback((classUuid: string) => {
    const cls = getClassRef.current(classUuid);
    if (!cls) {
      console.error("Class not exist: " + classUuid);
      return;
    }
    const attr = createAttributeRef.current(cls);
    setSelectedElement(attr?.uuid)
  }, [setSelectedElement]);

  const handleMethodCreate = useCallback((classUuid: string) => {
    const cls = getClassRef.current(classUuid);
    if (!cls) {
      console.error("Class not exist: " + classUuid);
      return;
    }
    createMothodRef.current(cls);
  }, []);

  const handleHideClass = useCallback(
    (entityId: string) => {
      hideClassRef.current && hideClassRef.current(entityId)
    },
    []
  );

  const handelDeleteClass = useCallback(
    (uuid: string) => {
      deleteClassRef.current && deleteClassRef.current(uuid);
    },
    []
  );

  useEffect(() => {
    graph?.on(ClassEvent.attributeSelect, handleAttributeSelect);
    graph?.on(ClassEvent.attributeDelete, handleAttributeDelete);
    graph?.on(ClassEvent.attributeCreate, handleAttributeCreate);
    graph?.on(ClassEvent.methodSelect, handleMethodSelect);
    graph?.on(ClassEvent.methodDelete, handleMothodDelete);
    graph?.on(ClassEvent.methodCreate, handleMethodCreate);
    graph?.on(ClassEvent.delete, handelDeleteClass);
    graph?.on(ClassEvent.hide, handleHideClass);
    return () => {
      graph?.off(ClassEvent.attributeSelect, handleAttributeSelect);
      graph?.off(ClassEvent.attributeDelete, handleAttributeDelete);
      graph?.off(ClassEvent.attributeCreate, handleAttributeCreate);
      graph?.off(ClassEvent.methodSelect, handleMethodSelect);
      graph?.off(ClassEvent.methodDelete, handleMothodDelete);
      graph?.off(ClassEvent.methodCreate, handleMethodCreate);
      graph?.off(ClassEvent.delete, handelDeleteClass);
      graph?.off(ClassEvent.hide, handleHideClass);
    };
  }, [graph, handelDeleteClass, handleAttributeCreate, handleAttributeDelete, handleAttributeSelect, handleHideClass, handleMethodCreate, handleMethodSelect, handleMothodDelete]);
}
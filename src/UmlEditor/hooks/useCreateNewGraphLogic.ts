import { useCallback } from "react";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { graphLogicsState, selectedGraphLogicIdState, selectedUmlDiagramState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { useGetGraphLogicByName } from "./useGetGraphLogicByName";
import { MethodMeta, MethodOperateType, Types } from "../meta";
import { ID, createUuid } from "shared";

export function useCreateNewGraphLogic(metaId: ID) {
  const getByName = useGetGraphLogicByName(metaId);
  const backup = useBackupSnapshot(metaId);
  const setMetaLogics = useSetRecoilState(graphLogicsState(metaId));
  const setSelectedGraphLogicId = useSetRecoilState(selectedGraphLogicIdState(metaId));
  const setSelectedDiagram = useSetRecoilState(
    selectedUmlDiagramState(metaId)
  );


  const getNewName = useCallback(() => {
    const prefix = "newGraphLogic";
    let index = 1;
    while (getByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getByName]);

  const createNewGraphLogic = useCallback((operateType: MethodOperateType) => {
    backup()
    const newGraphLogic: MethodMeta = {
      uuid: createUuid(),
      name: getNewName(),
      logicScript: "",
      operateType,
      type: Types.String,
      args: [],
      typeLabel: "String",
    };
    setMetaLogics(orchestrations => [...orchestrations, newGraphLogic]);
    setSelectedGraphLogicId(newGraphLogic.uuid);
    setSelectedDiagram(undefined);
  }, [backup, getNewName, setMetaLogics, setSelectedGraphLogicId, setSelectedDiagram]);

  return createNewGraphLogic;
}

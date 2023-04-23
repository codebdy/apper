import { useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { logicScriptsState, selectedScriptLogicIdState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { ID } from "shared";

export function useDeleteScriptLogic(metaId: ID) {
  const setLogicScripts = useSetRecoilState(logicScriptsState(metaId));
  const [selectedScriptId, setSelectedScriptId] = useRecoilState(selectedScriptLogicIdState(metaId));

  const backupSnapshot = useBackupSnapshot(metaId);

  const deleteOrchestration = useCallback(
    (logicScriptUuid: string) => {
      backupSnapshot();
      setLogicScripts((orches) =>
        orches.filter((or) => or.uuid !== logicScriptUuid)
      );

      if (selectedScriptId === logicScriptUuid) {
        setSelectedScriptId(undefined)
      }
    },
    [backupSnapshot, selectedScriptId, setLogicScripts, setSelectedScriptId]
  );

  return deleteOrchestration;
}

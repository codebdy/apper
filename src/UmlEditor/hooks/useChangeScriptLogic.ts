import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, } from "recoil";
import { ID } from "shared";
import { scriptLogicsState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { MethodMeta } from "UmlEditor/meta";

export function useChangeScriptLogic(metaId: ID) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const [scripts, setScripts] = useRecoilState(scriptLogicsState(metaId));

  const { t } = useTranslation();

  const changeScript = useCallback(
    (method: MethodMeta) => {
      if (
        scripts
          .filter((sc) => sc.uuid !== method.uuid)
          .find((sc) => sc.name === method.name)
      ) {
        return t("ErrorNameRepeat");
      }
      backupSnapshot();
      setScripts((scripts) =>
        scripts.map((mthd) => (mthd.uuid === method.uuid ? method : mthd))
      );
      return undefined;
    },
    [backupSnapshot, scripts, setScripts, t]
  );

  return changeScript;
}

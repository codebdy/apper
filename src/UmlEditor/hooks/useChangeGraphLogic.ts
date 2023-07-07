import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, } from "recoil";
import { ID } from "shared";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { MethodMeta } from "UmlEditor/meta";
import { graphLogicsState } from "UmlEditor/recoil/atoms";

export function useChangeGraphLogic(metaId: ID) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const [graphLogics, setGraphLogics] = useRecoilState(graphLogicsState(metaId));

  const { t } = useTranslation();

  const changeGraphLogic = useCallback(
    (method: MethodMeta) => {
      if (
        graphLogics
          .filter((sc) => sc.uuid !== method.uuid)
          .find((sc) => sc.name === method.name)
      ) {
        return t("ErrorNameRepeat");
      }
      backupSnapshot();
      setGraphLogics((graphLogics) =>
        graphLogics.map((mthd) => (mthd.uuid === method.uuid ? method : mthd))
      );
      return undefined;
    },
    [backupSnapshot, graphLogics, setGraphLogics, t]
  );

  return changeGraphLogic;
}

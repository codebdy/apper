import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, } from "recoil";
import { ID } from "shared";
import { codesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { CodeMeta } from "UmlEditor/meta/CodeMeta";

export function useChangeCode(metaId: ID) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const [codes, setCodes] = useRecoilState(codesState(metaId));

  const { t } = useTranslation();

  const changeCode = useCallback(
    (code: CodeMeta) => {
      if (
        codes
          .filter((sc) => sc.uuid !== code.uuid)
          .find((sc) => sc.name === code.name)
      ) {
        return t("ErrorNameRepeat");
      }
      backupSnapshot();
      setCodes((codes) =>
        codes.map((cd) => (cd.uuid === code.uuid ? code : cd))
      );
      return undefined;
    },
    [backupSnapshot, codes, setCodes, t]
  );

  return changeCode;
}

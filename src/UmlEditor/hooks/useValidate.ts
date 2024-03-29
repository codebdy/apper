import { message } from "antd";
import _ from "lodash";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { classesState } from "../recoil/atoms";
import { useGetClassAssociations } from "./useGetClassAssociations";

function hasDuplicates(array: string[]) {
  return _.some(array, function (elt: any, index: number) {
    return array.indexOf(elt) !== index;
  });
}

export function useValidate(metaId: ID) {
  const classes = useRecoilValue(classesState(metaId));
  const getClassAssociations = useGetClassAssociations(metaId);
  const { t } = useTranslation();
  const validate = useCallback(() => {
    //检查属性名重复
    for (const cls of classes) {
      const names = cls.attributes?.map((atr) => atr.name) || [];
      names.push(
        ...(getClassAssociations(cls.uuid)?.map((aso) => aso.name) || [])
      );
      if (hasDuplicates(names.filter((name) => !!name))) {
        message.error(t("UmlEditor.duplicated-property-error"));
        return false;
      }
    }
    //检查关联类属性名冲突
    return true;
  }, [classes, getClassAssociations, t]);

  return validate;
}

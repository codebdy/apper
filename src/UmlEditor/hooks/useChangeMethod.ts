import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ID } from "shared";
import { ClassMeta } from "../meta/ClassMeta";
import { MethodMeta } from "../meta/MethodMeta";
import { useChangeClass } from "./useChangeClass";
import { useCheckClassPropertyName } from "./useCheckClassPropertyName";

export function useChangeMethod(metaId: ID) {
  const changeClass = useChangeClass(metaId);
  const chackName = useCheckClassPropertyName(metaId);
  const { t } = useTranslation();
  const changeMethod = useCallback(
    (method: MethodMeta, cls: ClassMeta) => {
      if (!chackName(cls.uuid, method.name, method.uuid)) {
        return t("ErrorNameRepeat");
      }

      changeClass({
        ...cls,
        methods: cls.methods.map((mthd) =>
          mthd.uuid === method.uuid ? method : mthd
        ),
      });
    },
    [chackName, changeClass, t]
  );

  return changeMethod;
}
import { useMetaId } from "UmlEditor/hooks/useMetaId";
import { MethodMeta, MethodOperateType } from "UmlEditor/meta";
import { scriptLogicsState } from "UmlEditor/recoil/atoms";
import { DataNode } from "antd/es/tree";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { FunctionOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { ScriptLogicLabel } from "./ScriptLogicLabel";

export function useGetScriptNodes() {
  const metaId = useMetaId();
  const { t } = useTranslation();
  const scriptMetas = useRecoilValue(scriptLogicsState(metaId))
  const getScriptLogicNode = useCallback((scriptMeta: MethodMeta) => {
    return {
      title: <ScriptLogicLabel scriptMeta={scriptMeta} />,
      key: scriptMeta.uuid,
      isLeaf: true,
      icon: <FunctionOutlined />
    }
  }, [])


  const getQueryNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: scriptMetas.filter(orches => orches.operateType === MethodOperateType.Query).map(orchestration => getScriptLogicNode(orchestration))
    }
  }, [getScriptLogicNode, scriptMetas])

  const getMutationNodes = useCallback((title: string, key: string) => {
    return {
      title: title,
      key: key,
      children: scriptMetas.filter(orches => orches.operateType === MethodOperateType.Mutation).map(orchestration => getScriptLogicNode(orchestration))
    }
  }, [getScriptLogicNode, scriptMetas])

  const getScriptNodes = useCallback(() => {
    const scriptChildren: DataNode[] = []
    const queryNodes = getQueryNodes(t("UmlEditor.QueryScripts"), "querys");
    const mutationNodes = getMutationNodes(t("UmlEditor.MutationScripts"), "mutations");

    if (queryNodes?.children?.length) {
      scriptChildren.push(queryNodes)
    }

    if (mutationNodes?.children?.length) {
      scriptChildren.push(mutationNodes)
    }

    return scriptChildren
  }, [getQueryNodes, t, getMutationNodes]);

  return getScriptNodes
}
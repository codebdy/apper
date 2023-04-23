import React, { memo } from "react";
import { ClassPanel } from "./ClassPanel";
import { AttributePanel } from "./AttributePanel";
import { RelationPanel } from "./RelationPanel";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useClass } from "../hooks/useClass";
import { useAttribute } from "../hooks/useAttribute";
import { useRelation } from "../hooks/useRelation";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";
import { PropertyBox } from "common/ModelBoard/PropertyBox";
import { useMetaId } from "../hooks/useMetaId";
import { useSelectedScriptLogic } from "UmlEditor/hooks/useSelectedScriptLogic";
import { ScriptLogicPanel } from "./MethodPanel/ScriptLogicPanel";

export const PropertyPanel = memo(() => {
  const metaId = useMetaId();
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const selectedEntity = useClass(selectedElement || "", metaId);
  const selectedScript = useSelectedScriptLogic();
  const { t } = useTranslation();
  const { cls: attributeCls, attribute } = useAttribute(
    selectedElement || "",
    metaId
  );

  const relation = useRelation(selectedElement || "", metaId);

  return (
    <PropertyBox title={t("UmlEditor.Properties")} >
      {selectedEntity && <ClassPanel cls={selectedEntity} />}
      {attribute && attributeCls && (
        <AttributePanel attribute={attribute} cls={attributeCls} />
      )}
      {relation && <RelationPanel relation={relation} />}
      {selectedScript && <ScriptLogicPanel scriptLogic={selectedScript} />}
      {!selectedElement && !selectedScript && (
        <div style={{ padding: "16px" }}>
          <Empty />
        </div>
      )}
    </PropertyBox>
  );
});

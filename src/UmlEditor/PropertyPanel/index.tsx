import React, { memo } from "react";
import { ClassPanel } from "./ClassPanel";
import { AttributePanel } from "./AttributePanel";
import { RelationPanel } from "./RelationPanel";
import { useRecoilValue } from "recoil";
import { selectedElementState } from "../recoil/atoms";
import { useClass } from "../hooks/useClass";
import { useAttribute } from "../hooks/useAttribute";
import { useRelation } from "../hooks/useRelation";
import { useMethod } from "../hooks/useMethod";
import { MethodPanel } from "./MethodPanel";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";
import { PropertyBox } from "common/ModelBoard/PropertyBox";
import { useMetaId } from "../hooks/useMetaId";

export const PropertyPanel = memo(() => {
  const metaId = useMetaId();
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const selectedEntity = useClass(selectedElement || "", metaId);
  const { t } = useTranslation();
  const { cls: attributeCls, attribute } = useAttribute(
    selectedElement || "",
    metaId
  );
  const { cls: methodCls, method } = useMethod(
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
      {method && methodCls && <MethodPanel method={method} cls={methodCls} />}
      {relation && <RelationPanel relation={relation} />}
      {!selectedElement && (
        <div style={{ padding: "16px" }}>
          <Empty />
        </div>
      )}
    </PropertyBox>
  );
});

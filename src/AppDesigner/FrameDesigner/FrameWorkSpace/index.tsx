import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { SettingsPanel, ToolbarPanel, useDesigner, ViewPanel, ViewportPanel, Workspace, WorkspacePanel } from 'designable/react'
import { ComponentTreeWidget, DesignerToolsWidget, PreviewWidget, SchemaEditorWidget, ViewToolsWidget } from "../../UiDesigner/widgets";
import { useShowError } from "AppDesigner/hooks/useShowError";
import { ID } from "shared";
import { SettingsForm } from "../../UiDesigner/SettingsForm";
import { useMaterialDesigners } from "material/hooks/useMaterialDesigners";
import { useLazyQueryPageFrame } from "../hooks/useLazyQueryPageFrame";
import { FormDesigner } from "components/pc/FormDesigner";
import { SaveTemplateWidget } from "AppDesigner/UiDesigner/widgets/SaveTemplateWidget";
import { TemplateType } from "model";
import { transformToTreeNode } from "designable/formily-antd/transformer"
import { Field, ObjectContainer } from "designable/formily-antd";

export const FrameWorkSpace = (props: {
  frameId: ID
}) => {
  const { frameId } = props;
  const designer = useDesigner();
  const [query, { pageFrame, loading, error }] = useLazyQueryPageFrame();
  const materailDesigners = useMaterialDesigners();

  useEffect(() => {
    query(frameId)
  }, [frameId, query]);

  const { t } = useTranslation();

  useEffect(() => {
    designer.setCurrentTree(
      transformToTreeNode(pageFrame?.schemaJson || {})
    )
  }, [designer, pageFrame?.schemaJson])

  useShowError(error);

  return (
    loading ?
      <Spin>
        <div style={{ width: "calc(100vw - 280px)", height: "calc(100vh - 64px)" }}>
        </div>
      </Spin>
      :
      <>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <div>
                <SaveTemplateWidget templateType={TemplateType.Frame} />
                <ViewToolsWidget
                  use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']}
                />
              </div>
            </ToolbarPanel>
            <ViewportPanel style={{ height: '100%' }}>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form: FormDesigner,
                      Field,
                      ObjectContainer,
                      ...materailDesigners,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree:any, onChange:any) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree:any) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title={t("Panels.PropertySettings")}>
          <SettingsForm uploadAction="#" />
        </SettingsPanel>
      </>
  )
}

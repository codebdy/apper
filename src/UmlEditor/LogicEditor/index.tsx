import { EditOutlined } from "@ant-design/icons"
import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5"
import { Fieldy } from "@rxdrag/react-fieldy"
import { Button, Form, Modal } from "antd"
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { activityMaterialCategories, activityMaterialLocales } from "./minion-materials"
import { useToken } from "antd/es/theme/internal"
import { useSubLogicFlows } from "UmlEditor/hooks/useSubLogicFlows"
import { ILogicFlowContext } from "./ILogicFlowContext"
import { MethodMeta } from "UmlEditor/meta"
import { SubLogicFlowSelect } from "./setters/SubLogicFlowSelect"
import { ActivityType, ILogicFlowDefine } from "@rxdrag/minions-schema"
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor"

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EditorShell = styled.div`
  display: flex;
  height: calc(100vh - 200px);
  border: solid 1px ${props => props.theme?.token?.colorBorder};
`

const EmpertyMetas = {
  nodes: [],
  lines: []
}

export const LogicEditor = memo((
  props: {
    metaId: string,
    value?: MethodMeta,
    onChange?: (value: MethodMeta) => void
  }
) => {
  const { metaId, value, onChange } = props;
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState<ILogicMetas>(value?.logicMetas || EmpertyMetas);
  const subFlows = useSubLogicFlows(metaId)
  useEffect(() => {
    setInputValue(value?.logicMetas || EmpertyMetas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.uuid])

  const { t } = useTranslation();
  const [, token] = useToken();

  const handleChange = useCallback((val: ILogicMetas) => {
    setInputValue(val)
  }, [])

  const handleEditClick = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleOk = useCallback(() => {
    value && onChange?.({ ...value, logicMetas: inputValue })
    handleClose()
  }, [handleClose, inputValue, onChange, value])

  const logicFlowContext: ILogicFlowContext = useMemo(() => {
    return {
      subLogicFlows: subFlows || []
    }
  }, [subFlows])

  const canBeReferencedLogflowMetas: ILogicFlowDefine[] = useMemo(() => {
    return subFlows.map(subflow => ({
      id: subflow.uuid,
      name: subflow.name,
      type: ActivityType.LogicFlowActivity,
      nodes: subflow?.logicMetas?.nodes || [],
      lines: subflow?.logicMetas?.lines || [],
    }))
  }, [subFlows])

  return (
    <Container>
      <Button
        type="primary"
        size="large"
        icon={<EditOutlined />}
        onClick={handleEditClick}
      >
        {t("UmlEditor.EditLogic")}
      </Button>
      <Modal
        title={t("UmlEditor.EditLogic")}
        centered
        open={open}
        maskClosable={false}
        onOk={handleOk}
        onCancel={handleClose}
        width={"calc(100vw - 100px)"}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <EditorShell>
          <Fieldy>
            <LogicFlowEditorAntd5
              materialCategories={activityMaterialCategories}
              locales={activityMaterialLocales}
              token={token}
              value={inputValue}
              logicFlowContext={logicFlowContext}
              onChange={handleChange}
              setters={{
                SubLogicFlowSelect,
              }}
              canBeReferencedLogflowMetas={canBeReferencedLogflowMetas}
            />
          </Fieldy>
        </EditorShell>
      </Modal>
    </Container>
  )
})
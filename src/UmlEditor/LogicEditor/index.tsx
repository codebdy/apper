import { EditOutlined } from "@ant-design/icons"
import { LogicFlowEditorAntd5 } from "@rxdrag/logicflow-editor-antd5"
import { Fieldy } from "@rxdrag/react-fieldy"
import { Button, Form, Modal } from "antd"
import { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { activityMaterialCategories, activityMaterialLocales } from "./minion-materials"
import { useToken } from "antd/es/theme/internal"

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EditorShell = styled.div`
  display: flex;
  height: calc(100vh - 200px);
  border: solid 1px ${props => props.theme?.token?.colorBorder}
`

export const LogicEditor = memo(() => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [, token] = useToken();

  const handleEditClick = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

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
        onOk={handleClose}
        onCancel={handleClose}
        width={"calc(100vw - 100px)"}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <EditorShell>
          <Fieldy>
            <Form
              labelAlign="left"
              colon={false}
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 17 }}
              autoComplete="off"
              labelWrap={true}
              style={{
                flex: 1,
                height: '100%',
                display: "flex",
              }}
            >
              <LogicFlowEditorAntd5
                //value={inputValue}
                //onChange={handleChange}
                //controllerMetas={[inputValue]}
                materialCategories={activityMaterialCategories}
                locales={activityMaterialLocales}
                token={token}
                value={{
                  nodes: [],
                  lines: []
                }}
              // setters={{
              //   VariableSelect,
              //   PropSelect,
              //   ReactionSelect,
              // }}
              />
            </Form>
          </Fieldy>
        </EditorShell>
      </Modal>
    </Container>
  )
})
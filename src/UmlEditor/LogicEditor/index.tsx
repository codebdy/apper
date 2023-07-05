import { EditOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"
import { memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EditorShell = styled.div`
  display: flex;
  height: calc(100vh - 200px);
`

export const LogicEditor = memo(() => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

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
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </EditorShell>
      </Modal>
    </Container>
  )
})
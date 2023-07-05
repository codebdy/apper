import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LogicEditor = memo(() => {
  const { t } = useTranslation();
  return (
    <Container>
      <Button type="primary" size="large" icon={<EditOutlined />}>
        {t("UmlEditor.EditLogic")}
      </Button>
    </Container>
  )
})
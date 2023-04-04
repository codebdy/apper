import { Button, Input, Space } from "antd";
import { Spring } from "../Spring";
import { memo } from "react"
import styled from "styled-components"
import { PlusOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next";

const Container = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
`
const { Search } = Input;

export const AppManagerHeader = memo(() => {
  const { t } = useTranslation();
  return (
    <Container>
      <Search placeholder="" style={{ width: 300 }} />
      <Spring />
      <Space>
        <Button >
          {t('AppManager.ImportApp')}
        </Button>
        <Button type="primary" icon={<PlusOutlined />}>
          {t('AppManager.CreateApp')}
        </Button>
      </Space>
    </Container>
  )
})
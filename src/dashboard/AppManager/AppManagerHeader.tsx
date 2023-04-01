import { Button, Input, Space } from "antd";
import { Spring } from "../Spring";
import { memo } from "react"
import styled from "styled-components"
import { PlusOutlined, ShoppingOutlined } from "@ant-design/icons"

const Container = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
`
const { Search } = Input;

export const AppManagerHeader = memo(() => {
  return (
    <Container>
      <Search placeholder="" style={{ width: 300 }} />
      <Spring />
      <Space>
        <Button type="primary" icon={<PlusOutlined />}>
          导入应用
        </Button>
        <Button type="primary" danger disabled icon={<ShoppingOutlined />}>
          应用市场
        </Button>
      </Space>
    </Container>
  )
})
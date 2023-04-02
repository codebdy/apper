import { Button, Input, Space } from "antd";
import { Spring } from "../Spring";
import { memo } from "react"
import styled from "styled-components"
import { PlusOutlined } from "@ant-design/icons"

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
        <Button >
          导入应用
        </Button>
        <Button type="primary" icon={<PlusOutlined />}>
          新建应用
        </Button>
      </Space>
    </Container>
  )
})
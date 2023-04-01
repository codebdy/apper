import { Col, Row } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { AppManagerHeader } from "./AppManagerHeader"
import { AppCard } from "./AppCard"

const Container = styled.div`
  display:flex;
  flex-flow: column;
`

export const AppManager = memo(() => {
  return (
    <Container>
      <AppManagerHeader />
      <Row gutter={16}>
        <Col span={6}>
          <AppCard />
        </Col>
      </Row>
    </Container>
  )
})
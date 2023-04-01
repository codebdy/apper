import { Col, Row } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { AppManagerHeader } from "./AppManagerHeader"

const Container = styled.div`
  display:flex;
  flex-flow: column;
`

export const AppManager = memo(() => {
  return (
    <Container>
      <AppManagerHeader />
      <Row gutter={16}>
        <Col>
          AppManager
        </Col>
      </Row>
    </Container>
  )
})
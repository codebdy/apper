import { Col, Row } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { AppManagerHeader } from "./AppManagerHeader"
import { AppCard } from "./AppCard"

const Container = styled.div`
  display:flex;
  flex-flow: column;
`

const StyledRow = styled(Row)`
  padding: 16px 0;
`

export const AppManager = memo(() => {
  return (
    <Container>
      <AppManagerHeader />
      <StyledRow gutter={32}>
        <Col span={6}>
          <AppCard />
        </Col>
        <Col span={6}>
          <AppCard />
        </Col>
      </StyledRow>
    </Container>
  )
})
import { Col, Row } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { AppManagerHeader } from "./AppManagerHeader"
import { AppCard } from "./AppCard"

const Container = styled.div`
  display:flex;
  flex-flow: column;
  flex:1;
`

const StyledRow = styled(Row)`

  height: 0;
  padding: 16px 0;

`

const StyleCol = styled(Col)`
  padding-bottom: 32px;
`


export const AppManager = memo(() => {
  return (
    <Container>
      <AppManagerHeader />
      <StyledRow gutter={32}>
        <StyleCol span={6}>
          <AppCard />
        </StyleCol>
        <StyleCol span={6}>
          <AppCard />
        </StyleCol>
        <StyleCol span={6}>
          <AppCard />
        </StyleCol>
        <StyleCol span={6}>
          <AppCard />
        </StyleCol>
        <StyleCol span={6}>
          <AppCard />
        </StyleCol>
        <StyleCol span={6}>
          <AppCard />
        </StyleCol>
      </StyledRow>
    </Container>
  )
})
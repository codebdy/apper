import { Col, Row, Spin } from "antd"
import { useShowError } from "designer/hooks/useShowError"
import { useQueryApps } from "hooks/useQueryApps"
import { memo } from "react"
import styled from "styled-components"
import { ServiceManagerHeader } from "./ServiceManagerHeader"
import { ServiceCard } from "./ServiceCard"

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

export const ServiceManager = memo(() => {
  const { apps, error, loading } = useQueryApps()
  useShowError(error)
  return (
    <Spin spinning={loading}>
      <Container>
        <ServiceManagerHeader />
        <StyledRow gutter={32}>
          {
            apps?.map(app => {
              return (<StyleCol span={6} key={app.id}>
                <ServiceCard service={app} />
              </StyleCol>)
            })
          }
        </StyledRow>
      </Container>
    </Spin>
  )
})
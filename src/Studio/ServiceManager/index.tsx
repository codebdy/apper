import { Col, Row, Spin } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { ServiceManagerHeader } from "./ServiceManagerHeader"
import { ServiceCard } from "./ServiceCard"
import { useQueryServices } from "hooks/useQueryServices"
import { useShowError } from "AppDesigner/hooks/useShowError"

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
  const { services, error, loading } = useQueryServices()
  useShowError(error)
  return (
    <Spin spinning={loading}>
      <Container>
        <ServiceManagerHeader />
        <StyledRow gutter={32}>
          {
            services?.map(service => {
              return (<StyleCol span={6} key={service.id}>
                <ServiceCard service={service} />
              </StyleCol>)
            })
          }
        </StyledRow>
      </Container>
    </Spin>
  )
})
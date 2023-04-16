import { useShowError } from "AppDesigner/hooks/useShowError"
import { Col, Row } from "antd"
import { AwesomeSpin } from "common/AwesomeSpin"
import { useQueryServices } from "hooks/useQueryServices"
import { memo } from "react"
import styled from "styled-components"
import { ServiceManagerHeader } from "./ServiceManagerHeader"
import { ServiceCard } from "./ServiceCard"

const Container = styled.div`
  display:flex;
  flex-flow: column;
  flex:1;
  color:${props => props.theme.token?.colorText};
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
    <AwesomeSpin spinning={loading}>
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
    </AwesomeSpin>
  )
})
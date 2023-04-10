import { Spin } from "antd"
import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  display:flex;
  flex-flow: column;
  flex:1;
  color:${props=>props.theme.token?.colorText};
`

export const ServiceManager = memo(() => {
  /* const { services, error, loading } = useQueryServices()
  useShowError(error) */
  return (
    <Spin spinning={false}>
      <Container>
        <div>服务配置:比如逻辑编排的物料管理等</div>
      </Container>
    </Spin>
  )
})
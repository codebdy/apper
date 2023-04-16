import { Col, Row } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { AppManagerHeader } from "./AppManagerHeader"
import { AppCard } from "./AppCard"
import { useQueryApps } from "hooks/useQueryApps"
import { useShowError } from "hooks/useShowError"
import { AwesomeSpin } from "common/AwesomeSpin"

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
  const { apps, error, loading } = useQueryApps()
  useShowError(error)
  return (
    <AwesomeSpin spinning={loading}>
      <Container>
        <AppManagerHeader />
        <StyledRow gutter={32}>
          {
            apps?.map(app => {
              return (<StyleCol span={6} key={app.id}>
                <AppCard app={app} />
              </StyleCol>)
            })
          }
        </StyledRow>
      </Container>
    </AwesomeSpin>
  )
})
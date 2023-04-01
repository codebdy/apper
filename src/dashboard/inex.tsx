import { useToken } from "antd/es/theme/internal"
import { memo, useMemo } from "react"
import styled, { ThemeProvider } from "styled-components"
import { Logo } from "./Logo"
import { Button, Divider, Space } from "antd"
import { AppstoreOutlined, CloudServerOutlined, SettingOutlined } from "@ant-design/icons"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
`

const Toolbar = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  padding: 0 16px;
  border-bottom: ${props => props.theme.token?.colorBorder} solid 1px;
`
const StyledDivider = styled(Divider)`
  height: 16px;
`

const Spring = styled.div`
  flex:1;
`

export const Dashbord = memo(() => {
  const [, token] = useToken()
  const theme = useMemo(() => {
    return {
      token
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Toolbar>
          <Logo />
          <StyledDivider type="vertical" />
          <Space>
            <Button type="text" icon={<AppstoreOutlined />}>
              应用中心
            </Button>
            <Button type="text" icon={<CloudServerOutlined />}>
              服务中心
            </Button>
            <Button type="text" icon={<SettingOutlined />}>
              配置中心
            </Button>
          </Space>
          <Spring />
          notication
        </Toolbar>
      </Container>
    </ThemeProvider>
  )
})
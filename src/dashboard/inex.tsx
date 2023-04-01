import { useToken } from "antd/es/theme/internal"
import { memo, useMemo } from "react"
import styled, { ThemeProvider } from "styled-components"
import { Logo } from "./Logo"
import { Avatar, Badge, Button, Divider, Space } from "antd"
import { AppstoreOutlined, CloudServerOutlined, SettingOutlined, BellOutlined, UserOutlined } from "@ant-design/icons"
import { AppManager } from "./AppManager"
import { Spring } from "./Spring"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
`

const Toolbar = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  padding: 0 64px;
  border-bottom: ${props => props.theme.token?.colorBorder} solid 1px;
`
const StyledDivider = styled(Divider)`
  height: 16px;
  margin: 0 24px;
`

const Content = styled.div`
  flex: 1;
  padding: 0 64px;
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
            <Button type="primary" icon={<AppstoreOutlined />}>
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
          <Space>
            <Button type="text" icon={
              <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="20px" fill="currentColor"><rect fill="none" height="24" width="24" /><path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" /></svg>
            } />

            {/* <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495l1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115l1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96l1.41 1.41 1.79-1.8-1.41-1.41z"/></svg> */}
            <Badge count={5} offset={[-6, 2]}>
              <Button type="text" icon={<BellOutlined />} />
            </Badge>
            <Avatar style={{ marginLeft: 16 }} icon={<UserOutlined />} />
          </Space>
        </Toolbar>
        <Content>
          <AppManager />
        </Content>
      </Container>
    </ThemeProvider>
  )
})
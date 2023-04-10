import { memo, useCallback } from "react"
import styled from "styled-components"
import { Logo } from "./Logo"
import { Badge, Button, Divider, Space } from "antd"
import { AppstoreOutlined, SettingOutlined, BellOutlined, CloudServerOutlined } from "@ant-design/icons"
import { Spring } from "./Spring"
import { useTranslation } from "react-i18next"
import AvatarMenu from "components/AvatarMenu"
import LangSelect from "components/LangSelect"
import { Outlet, useMatch, useNavigate } from "react-router-dom"
import { DashboardRoutes } from "./Routes"
import { ThemeSwitchButton } from "common/ThemeSwitchButton"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  background-color:${props => props.theme.token?.colorBgBase};
`

const Toolbar = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  padding: 0 64px;
  border-bottom: ${props => props.theme.token?.colorBorder} solid 1px;
  flex-shrink:0;
`
const StyledDivider = styled(Divider)`
  height: 16px;
  margin: 0 24px;
`

const Content = styled.div`
  flex: 1;
  padding: 0 112px;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  flex:1;
  overflow: auto;
`


export const Studio = memo(() => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const match = useMatch(`/*`)

  const handleToAppManager = useCallback(() => {
    navigate(`/${DashboardRoutes.AppManager}`)
  }, [navigate])

  const handleToServices = useCallback(() => {
    navigate(`/${DashboardRoutes.Services}`)
  }, [navigate])

  return (
    <Container>
      <Toolbar>
        <Logo />
        <StyledDivider type="vertical" />
        <Space>
          <Button
            type={match?.pathname === `/${DashboardRoutes.AppManager}` || match?.pathname === "/" ? "primary" : "text"}
            icon={<AppstoreOutlined />}
            onClick={handleToAppManager}
          >
            {t("Apps")}
          </Button>
          {<Button
            type={match?.pathname === `/${DashboardRoutes.Services}` ? "primary" : "text"}
            icon={<CloudServerOutlined />}
            onClick={handleToServices}
          >
            {t("Services")}
          </Button>}
          <Button type="text" icon={<SettingOutlined />}>
            {t("Configs.Title")}
          </Button>
        </Space>
        <Spring />
        <Space>
          <ThemeSwitchButton />
          <Badge count={5} offset={[-6, 2]}>
            <Button type="text" icon={<BellOutlined />} />
          </Badge>
          <AvatarMenu />
          <LangSelect />
        </Space>
      </Toolbar>
      <Content>
        <Outlet />
      </Content>
    </Container>
  )
})
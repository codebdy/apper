import { memo, useCallback } from "react"
import styled from "styled-components"
import { Logo } from "./Logo"
import { Badge, Button, Divider, Space } from "antd"
import { AppstoreOutlined, SettingOutlined, BellOutlined } from "@ant-design/icons"
import { Spring } from "./Spring"
import { useTranslation } from "react-i18next"
import AvatarMenu from "components/AvatarMenu"
import LangSelect from "components/LangSelect"
import { Outlet, useMatch, useNavigate } from "react-router-dom"
import { DashboardRoutes } from "./Routes"
import { ThemeSwitchButton } from "common/ThemeSwitchButton"
import SvgIcon from "common/SvgIcon"
import { themeModeState } from "recoil/atoms"
import { useRecoilValue } from "recoil"

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
  const themeMode = useRecoilValue(themeModeState)
  const navigate = useNavigate();

  const match = useMatch(`/*`)

  const handleToAppManager = useCallback(() => {
    navigate(`/${DashboardRoutes.AppManager}`)
  }, [navigate])

  const handleToServices = useCallback(() => {
    navigate(`/${DashboardRoutes.Services}`)
  }, [navigate])

  return (
    <Container className={themeMode}>
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
            icon={<SvgIcon>
              <svg viewBox="0 0 1024 1024" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem"><path d="M868.352 635.904V386.048c34.304-6.144 61.952-38.4 61.952-74.752 0-42.496-34.304-74.752-74.752-74.752-21.504 0-42.496 10.752-55.296 25.6l-213.504-119.296c2.048-6.144 4.096-12.8 4.096-21.504 0-42.496-34.304-74.752-74.752-74.752s-74.752 34.304-74.752 74.752c0 6.144 2.048 12.8 2.048 19.456L230.4 262.656c-16.896-16.896-36.352-27.648-57.344-27.648-42.496 0-74.752 34.304-74.752 74.752 0 36.352 25.6 66.048 59.904 74.752v251.904c-34.304 8.704-59.904 38.4-59.904 74.752 0 42.496 34.304 74.752 74.752 74.752 21.504 0 42.496-10.752 55.296-25.6l215.552 119.296c-4.096 8.704-6.144 19.456-6.144 29.696 0 42.496 34.304 74.752 74.752 74.752s74.752-34.304 74.752-74.752c0-10.752-2.048-21.504-6.144-31.744l215.552-117.248c14.848 14.848 34.304 25.6 57.344 25.6 42.496 0 74.752-34.304 74.752-74.752 1.536-39.424-24.064-69.12-60.416-75.264z m-309.248 212.992c-8.704-6.144-16.896-10.752-25.6-12.8v-189.952h-36.352v189.952c-10.752 2.048-21.504 8.704-29.696 14.848l-219.648-121.856c2.048-6.144 2.048-12.8 2.048-19.456 0-34.304-23.552-64-55.296-72.704V384c12.8-4.096 23.552-8.704 31.744-19.456l159.744 98.304 19.456-29.696-160.256-98.304c2.048-8.704 4.096-14.848 4.096-23.552 0-6.144-2.048-12.8-2.048-19.456L460.8 170.496c12.8 14.848 34.304 23.552 55.296 23.552 21.504 0 40.448-8.704 53.248-23.552l213.504 121.856c-2.048 6.144-2.048 12.8-2.048 19.456 0 8.704 2.048 14.848 4.096 23.552l-159.744 98.304 19.456 29.696 157.696-96.256c8.704 8.704 19.456 14.848 31.744 19.456V640c-31.744 8.704-53.248 38.4-53.248 72.704 0 6.144 0 12.8 2.048 16.896l-223.744 119.296z"  p-id="10883"></path><path d="M443.392 583.68c38.4 38.4 100.352 38.4 138.752 0s38.4-100.352 0-138.752-100.352-38.4-138.752 0c-38.4 37.888-38.4 100.352 0 138.752z" p-id="10884"></path></svg>
            </SvgIcon>}
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
import { QuestionCircleOutlined, GithubOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons"
import { Button, Divider, Menu, MenuProps, Space } from "antd"
import { useCallback, useMemo, useState } from "react"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage"
import styled from "styled-components"
import { useToken } from "antd/es/theme/internal"
import AvatarMenu from "components/AvatarMenu"
import SelectLang from "components/LangSelect"
import { ThemeSwitchButton } from "common/ThemeSwitchButton"
import SvgIcon from "common/SvgIcon"
import { useService } from "../contexts"
import { useTranslation } from "react-i18next"

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  color: ${props => props.theme.token?.colorText};
  //height: 56px;
`

const Title = styled.div`
  width: 160px;
  margin-left: 4px;
`

const MenuContainer = styled.div`
  flex:1;
`

const StyledDivider = styled(Divider)`
  height: 16px;
  margin-top: 6px;
`

export const ServiceDesignerHeader = memo(() => {
  const [current, setCurrent] = useState('model');
  const navigate = useNavigate()
  const { t } = useTranslation()
  const handleBack = useCallback(() => {
    navigate("/services")
  }, [navigate]);

  const service = useService();

  const [, token] = useToken()
  const parse = useParseLangMessage();

  const items: MenuProps['items'] = useMemo(() => [
    {
      label: t("ServiceDesign.Model"),
      key: 'model',
      icon: <SvgIcon>
        <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 1024 1024" version="1.1"><path d="M513.89 950.72c-5.5 0-11-1.4-15.99-4.2L143.84 743c-9.85-5.73-15.99-16.17-15.99-27.64V308.58c0-11.33 6.14-21.91 15.99-27.64L497.9 77.43c9.85-5.73 22.14-5.73 31.99 0l354.06 203.52c9.85 5.73 15.99 16.17 15.99 27.64V715.5c0 11.33-6.14 21.91-15.99 27.64L529.89 946.52c-4.99 2.8-10.49 4.2-16 4.2zM191.83 697.15L513.89 882.2l322.07-185.05V326.92L513.89 141.87 191.83 326.92v370.23z m322.06-153.34c-5.37 0-10.88-1.4-15.99-4.33L244.29 393.91c-15.35-8.79-20.6-28.27-11.77-43.56 8.83-15.28 28.41-20.5 43.76-11.72l253.61 145.7c15.35 8.79 20.6 28.27 11.77 43.56-6.01 10.32-16.76 15.92-27.77 15.92z m0 291.52c-17.66 0-31.99-14.26-31.99-31.84V530.44L244.55 393.91s-0.13 0-0.13-0.13l-100.45-57.69c-15.35-8.79-20.6-28.27-11.77-43.56s28.41-20.5 43.76-11.72l354.06 203.52c9.85 5.73 15.99 16.17 15.99 27.64v291.39c-0.13 17.71-14.46 31.97-32.12 31.97z m0 115.39c-17.66 0-31.99-14.26-31.99-31.84V511.97c0-17.58 14.33-31.84 31.99-31.84s31.99 14.26 31.99 31.84v406.91c0 17.7-14.33 31.84-31.99 31.84z m0-406.91c-11 0-21.75-5.73-27.77-15.92-8.83-15.28-3.58-34.64 11.77-43.56l354.06-203.52c15.35-8.79 34.8-3.57 43.76 11.72 8.83 15.28 3.58 34.64-11.77 43.56L529.89 539.61c-4.99 2.93-10.49 4.2-16 4.2z"></path></svg>
      </SvgIcon>,
    },
    {
      label: 'API',
      key: 'api',
      icon: <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1rem" height="1rem" viewBox="0 0 24 24"><path d="M12,5.37L11.56,5.31L6,14.9C6.24,15.11 6.4,15.38 6.47,15.68H17.53C17.6,15.38 17.76,15.11 18,14.9L12.44,5.31L12,5.37M6.6,16.53L10.88,19.06C11.17,18.79 11.57,18.63 12,18.63C12.43,18.63 12.83,18.79 13.12,19.06L17.4,16.53H6.6M12,22A1.68,1.68 0 0,1 10.32,20.32L10.41,19.76L6.11,17.21C5.8,17.57 5.35,17.79 4.84,17.79A1.68,1.68 0 0,1 3.16,16.11C3.16,15.32 3.69,14.66 4.42,14.47V9.36C3.59,9.25 2.95,8.54 2.95,7.68A1.68,1.68 0 0,1 4.63,6C5.18,6 5.66,6.26 5.97,6.66L10.38,4.13L10.32,3.68C10.32,2.75 11.07,2 12,2C12.93,2 13.68,2.75 13.68,3.68L13.62,4.13L18.03,6.66C18.34,6.26 18.82,6 19.37,6A1.68,1.68 0 0,1 21.05,7.68C21.05,8.54 20.41,9.25 19.58,9.36V14.47C20.31,14.66 20.84,15.32 20.84,16.11A1.68,1.68 0 0,1 19.16,17.79C18.65,17.79 18.2,17.57 17.89,17.21L13.59,19.76L13.68,20.32A1.68,1.68 0 0,1 12,22M10.8,4.86L6.3,7.44L6.32,7.68C6.32,8.39 5.88,9 5.26,9.25L5.29,14.5L10.8,4.86M13.2,4.86L18.71,14.5L18.74,9.25C18.12,9 17.68,8.39 17.68,7.68L17.7,7.44L13.2,4.86Z" /></svg>
      </SvgIcon>,
    },
    {
      label: t("ServiceDesign.Config"),
      key: 'config',
      icon: <SettingOutlined />,
    },

  ], [t]);
  const onClick: MenuProps['onClick'] = useCallback((e: any) => {
    console.log('click ', e);
    setCurrent(e.key);
  }, []);

  return (
    <StyledHeader style={{ backgroundColor: token.colorBgContainer }}>
      <Button type="text" icon={<HomeOutlined />} onClick={handleBack}></Button>
      <StyledDivider type='vertical' />
      <Title>{parse(service?.title)}</Title>
      <MenuContainer>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      </MenuContainer>
      <Space>
        <ThemeSwitchButton />
        <Button type="text" icon={<QuestionCircleOutlined />} />
        <Button
          type="text"
          icon={<GithubOutlined />}
          href="https://github.com/rxdrag/apper"
          target="_blank"
        />
        <AvatarMenu />
        <SelectLang />
      </Space>
    </StyledHeader >
  )
})



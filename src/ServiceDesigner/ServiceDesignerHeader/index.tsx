import { QuestionCircleOutlined, GithubOutlined, HomeOutlined, SettingOutlined } from "@ant-design/icons"
import { Button, Divider, Menu, MenuProps, Space } from "antd"
import { useCallback, useState } from "react"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage"
import styled from "styled-components"
import { useToken } from "antd/es/theme/internal"
import AvatarMenu from "components/AvatarMenu"
import SelectLang from "components/LangSelect"
import { ThemeSwitchButton } from "common/ThemeSwitchButton"
import { Operate } from "./Operate"
import { IService } from "model"
import SvgIcon from "common/SvgIcon"
import { useService } from "ServiceDesigner/contexts"

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
const items: MenuProps['items'] = [
  {
    label: '模型',
    key: 'model',
    icon: <SvgIcon>
      <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 1024 1024" version="1.1"><path d="M513.89 950.72c-5.5 0-11-1.4-15.99-4.2L143.84 743c-9.85-5.73-15.99-16.17-15.99-27.64V308.58c0-11.33 6.14-21.91 15.99-27.64L497.9 77.43c9.85-5.73 22.14-5.73 31.99 0l354.06 203.52c9.85 5.73 15.99 16.17 15.99 27.64V715.5c0 11.33-6.14 21.91-15.99 27.64L529.89 946.52c-4.99 2.8-10.49 4.2-16 4.2zM191.83 697.15L513.89 882.2l322.07-185.05V326.92L513.89 141.87 191.83 326.92v370.23z m322.06-153.34c-5.37 0-10.88-1.4-15.99-4.33L244.29 393.91c-15.35-8.79-20.6-28.27-11.77-43.56 8.83-15.28 28.41-20.5 43.76-11.72l253.61 145.7c15.35 8.79 20.6 28.27 11.77 43.56-6.01 10.32-16.76 15.92-27.77 15.92z m0 291.52c-17.66 0-31.99-14.26-31.99-31.84V530.44L244.55 393.91s-0.13 0-0.13-0.13l-100.45-57.69c-15.35-8.79-20.6-28.27-11.77-43.56s28.41-20.5 43.76-11.72l354.06 203.52c9.85 5.73 15.99 16.17 15.99 27.64v291.39c-0.13 17.71-14.46 31.97-32.12 31.97z m0 115.39c-17.66 0-31.99-14.26-31.99-31.84V511.97c0-17.58 14.33-31.84 31.99-31.84s31.99 14.26 31.99 31.84v406.91c0 17.7-14.33 31.84-31.99 31.84z m0-406.91c-11 0-21.75-5.73-27.77-15.92-8.83-15.28-3.58-34.64 11.77-43.56l354.06-203.52c15.35-8.79 34.8-3.57 43.76 11.72 8.83 15.28 3.58 34.64-11.77 43.56L529.89 539.61c-4.99 2.93-10.49 4.2-16 4.2z"></path></svg>
    </SvgIcon>,
  },
  {
    label: '配置',
    key: 'config',
    icon: <SettingOutlined />,
  },

];
export const ServiceDesignerHeader = memo(() => {
  const [current, setCurrent] = useState('model');
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/services")
  }, [navigate]);

  const service = useService();

  const [, token] = useToken()
  const parse = useParseLangMessage();


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
        <Operate />
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



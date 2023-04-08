import { QuestionCircleOutlined, GithubOutlined, HomeOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons"
import { Button, Divider, Menu, MenuProps, Space } from "antd"
import { useCallback, useState } from "react"
import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage"
import styled from "styled-components"
import { useToken } from "antd/es/theme/internal"
import AvatarMenu from "components/AvatarMenu"
import SelectLang from "components/LangSelect"
import { ThemeSwitchButton } from "common/ThemeSwitchButton"

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  color: ${props => props.theme.token?.colorText};
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
    label: '模型定义',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    label: '接口定义',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
];

export const ServiceDesignerHeader = memo((props: {
}) => {

  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/services")
  }, [navigate]);

  const { t } = useTranslation();
  const [, token] = useToken()
  const parse = useParseLangMessage();
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <StyledHeader style={{ backgroundColor: token.colorBgContainer }}>
      <Button type="text" icon={<HomeOutlined />} onClick={handleBack}></Button>
      <StyledDivider type='vertical' />
      <Title>服务名称</Title>
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



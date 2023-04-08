import { QuestionCircleOutlined, GithubOutlined, HomeOutlined } from "@ant-design/icons"
import { Button, Divider, Space } from "antd"
import { useCallback } from "react"
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
  height: 56px;
`

export const ServiceDesignerHeader = memo((props: {
}) => {

  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/")
  }, [navigate]);

  const { t } = useTranslation();
  const [, token] = useToken()
  const parse = useParseLangMessage();

  return (
    <StyledHeader style={{ backgroundColor: token.colorBgContainer }}>
      <Button type="text" icon={<HomeOutlined />} onClick={handleBack}></Button>
      <Divider type='vertical' />
      <div className="app-title" style={{ marginLeft: "4px" }}>服务名称</div>
      <div>Button</div>
      <div style={{ flex: 1 }}></div>
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


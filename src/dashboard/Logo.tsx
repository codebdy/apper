import { memo } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  svg{
    margin-right: 16px;
    width: 40px;
    height: 40px;
  }
`
export const Logo = memo(() => {
  const { t } = useTranslation()
  return (
    <Container>
      <img alt="logo" src="/logo.png" style={{width:32, marginRight:16, borderRadius:8}} />
      {t("Leda")}
    </Container>
  )
})
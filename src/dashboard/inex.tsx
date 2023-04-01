import { useToken } from "antd/es/theme/internal"
import { memo, useMemo } from "react"
import styled, { ThemeProvider } from "styled-components"
import { Logo } from "./Logo"

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
        </Toolbar>
      </Container>
    </ThemeProvider>
  )
})
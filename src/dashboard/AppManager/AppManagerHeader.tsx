import { Input } from "antd";
import { Spring } from "../Spring";
import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
`
const { Search } = Input;

export const AppManagerHeader = memo(() => {
  return (
    <Container>
      <Search placeholder="input search text" style={{ width: 300 }} />
      <Spring />
    </Container>
  )
})
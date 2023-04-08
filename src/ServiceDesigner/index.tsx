import { Layout } from "antd";
import { memo } from "react"
import { ServiceDesignerHeader } from "./ServiceDesignerHeader";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const { Content } = Layout;
const StyledLayout = styled(Layout)`
  height: 100vh;
  background-color: ${props => props.theme.token?.colorBgBase};
`
export const ServiceDesigner = memo(() => {

  return (
    <StyledLayout>
      <ServiceDesignerHeader />
      <Content>
        <Outlet />
      </Content>
    </StyledLayout>
  )
})

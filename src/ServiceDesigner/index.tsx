import { Layout, Spin } from "antd";
import { memo } from "react"
import { ServiceDesignerHeader } from "./ServiceDesignerHeader";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQueryOneService } from "hooks/useQueryOneService";
import { useShowError } from "AppDesigner/hooks/useShowError";

const { Content } = Layout;
const StyledLayout = styled(Layout)`
  height: 100vh;
  background-color: ${props => props.theme.token?.colorBgBase};
`
export const ServiceDesigner = memo(() => {
  const { serviceId = "" } = useParams();
  const { service, loading, error } = useQueryOneService(serviceId)

  useShowError(error);

  return (
    <Spin spinning = {loading}>
      <StyledLayout>
        <ServiceDesignerHeader service = {service} />
        <Content>
          <Outlet />
        </Content>
      </StyledLayout>
    </Spin>
  )
})

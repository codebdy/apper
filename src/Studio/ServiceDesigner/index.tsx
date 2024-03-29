import { Layout, Spin } from "antd";
import { memo } from "react"
import { ServiceDesignerHeader } from "./ServiceDesignerHeader";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { useQueryOneService } from "hooks/useQueryOneService";
import { useShowError } from "hooks/useShowError";
import { ServiceContext } from "./contexts";
import { useRecoilValue } from "recoil";
import { themeModeState } from "recoil/atoms";

const { Content } = Layout;
const StyledLayout = styled(Layout)`
  height: 100vh;
  background-color: ${props => props.theme.token?.colorBgBase};
`
export const ServiceDesigner = memo(() => {
  const { serviceId = "" } = useParams();
  const { service, loading, error } = useQueryOneService(serviceId)
  const themeMode = useRecoilValue(themeModeState)
  useShowError(error);

  return (
    <Spin spinning={loading}>
      <ServiceContext.Provider value={service}>
        <StyledLayout className={themeMode}>
          <ServiceDesignerHeader />
          <Content>
            <Outlet />
          </Content>
        </StyledLayout>
      </ServiceContext.Provider>
    </Spin>
  )
})

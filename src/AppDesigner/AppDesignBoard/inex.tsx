
import { Layout } from 'antd';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useDesignerParams } from 'plugin-sdk';
import DesignerHeader from "../AppDesignerHeader";
import styled from 'styled-components';

const { Content } = Layout;
const StyledLayout = styled(Layout)`
  height: 100vh;
  background-color: ${props => props.theme.token?.colorBgBase};
`

export const AppDesignBoard = memo(() => {
  const { app } = useDesignerParams();
  return (
    <StyledLayout>
      <DesignerHeader app={app} />
      <Content>
        <Outlet />
      </Content>
    </StyledLayout>
  )
})
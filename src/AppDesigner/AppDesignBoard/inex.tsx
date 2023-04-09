
import { Layout } from 'antd';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useDesignerParams } from 'plugin-sdk';
import DesignerHeader from "../AppDesignerHeader";
import styled from 'styled-components';

const { Content } = Layout;
const StyledContent = styled(Content)`
  flex: 1;
  display: flex;
  flex-flow: column;
`
const StyledLayout = styled(Layout)`
  display: flex;
  flex-flow: column;
  height: 100vh;
  background-color: ${props => props.theme.token?.colorBgBase};
`

export const AppDesignBoard = memo(() => {
  const { app } = useDesignerParams();
  return (
    <StyledLayout>
      <DesignerHeader app={app} />
      <StyledContent className='app-board-content'>
        <Outlet />
      </StyledContent>
    </StyledLayout>
  )
})
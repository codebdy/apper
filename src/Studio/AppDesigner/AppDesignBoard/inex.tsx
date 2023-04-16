
import { Layout } from 'antd';
import React, { memo } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import DesignerHeader from "../AppDesignerHeader";
import styled from 'styled-components';
import { themeModeState } from 'recoil/atoms';
import { useRecoilValue } from 'recoil';
import { useQueryApp } from '../hooks/useQueryApp';
import { AwesomeSpin } from 'common/AwesomeSpin';
import { useShowError } from 'hooks/useShowError';
import { AppContext } from '../contexts';

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
  const { appId = "" } = useParams();
  const { app, loading, error } = useQueryApp(appId)
  const themeMode = useRecoilValue(themeModeState)

  useShowError(error);

  return (
    <AwesomeSpin spinning={loading}>
      <AppContext.Provider value = {app}>
        <StyledLayout className={themeMode}>
          <DesignerHeader />
          <StyledContent className='app-board-content'>
            <Outlet />
          </StyledContent>
        </StyledLayout>
      </AppContext.Provider>
    </AwesomeSpin>
  )
})
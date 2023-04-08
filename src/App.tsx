import { memo } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner/index';
import Install from './Install';
import { APP_DESIGN, DESIGNER_TOKEN_NAME, DESIGN_BOARD, INDEX_URL, INSTALL_URL, LOGIN_URL, SERVER_URL, SERVICE_DESIGN, SYSTEM_APP_ID } from './consts';
import { AppEntryRouts } from './AppDesigner/DesignerHeader/AppEntryRouts';
import AppUis from './AppDesigner/DesignerHeader/AppUis';
import { LoggedInPanel } from './Login/LoggedInPanel';
import { AppFrames } from './AppDesigner/DesignerHeader/AppFrames';
import { AppBpmn } from './AppDesigner/AppBpmn';
import { AppDmn } from './AppDesigner/AppDmn';
import AppConfig from './AppDesigner/AppConfig';
import AppUml from './AppDesigner/AppUml';
import ApiBoard from './AppDesigner/ApiBoard';
import { AuthBoard, AuthRoutes } from './AppDesigner/AppAuth';
import { MenuAuthBoard } from './AppDesigner/AppAuth/MenuAuthBoard';
import { ModelAuthBoard } from './AppDesigner/AppAuth/ModelAuthBoard';
import { PageAuthBoard } from './AppDesigner/AppAuth/PageAuthBoard';
import { EntiRoot } from './enthooks';
import { AppDesignBoard } from './AppDesigner/AppDesignBoard/inex';
import { Studio } from 'Studio';
import { DashboardRoutes } from 'Studio/Routes';
import { AppManager } from 'Studio/AppManager';
import { ServiceManager } from 'Studio/ServiceManager';
import { ServiceDesigner } from 'ServiceDesigner';

const App = memo(() => {
  return (
    <EntiRoot config={{ endpoint: SERVER_URL, appId: SYSTEM_APP_ID, tokenName: DESIGNER_TOKEN_NAME }} >
      <Routes>
        <Route path={INDEX_URL} element={<LoggedInPanel />}>
          <Route path={INDEX_URL} element={<Studio />}>
            <Route path={""} element={<AppManager />} />
            <Route path={DashboardRoutes.AppManager} element={<AppManager />} />
            <Route path={DashboardRoutes.Services} element={<ServiceManager />} />
          </Route>
          <Route path={`/${SERVICE_DESIGN}/:serviceId`} element={<ServiceDesigner />}>
          </Route>
          <Route path={`/${APP_DESIGN}`} element={<AppDesigner />}>
            <Route path=":appId">
              <Route path={DESIGN_BOARD} element={<AppDesignBoard />}>
                <Route path={AppEntryRouts.AppUis} element={<AppUis />} />
                <Route path={AppEntryRouts.Bpmn} element={<AppBpmn />} />
                <Route path={AppEntryRouts.Dmn} element={<AppDmn />} />
                <Route path={AppEntryRouts.Uml} element={<AppUml />} />
                <Route path={AppEntryRouts.Api} element={<ApiBoard />} />
                <Route path={AppEntryRouts.Frame} element={<AppFrames />} />
                <Route path={AppEntryRouts.Auth} element={<AuthBoard />}>
                  <Route path={AuthRoutes.MenuAuth} element={<MenuAuthBoard />} />
                  <Route path={AuthRoutes.ComponentAuth} element={<PageAuthBoard />} />
                  <Route path={AuthRoutes.ModelAuth} element={<ModelAuthBoard />} />
                  <Route path="" element={<MenuAuthBoard />} />
                </Route>
                <Route path={AppEntryRouts.Config} element={<AppConfig />}></Route>
                <Route path="" element={<AppUis />}></Route>
              </Route>
            </Route>
            <Route path="" element={<AppDesignBoard />} >
              <Route path="" element={<AppUis />}></Route>
            </Route>
          </Route>
        </Route>
        <Route path={LOGIN_URL} element={<Login />} />
        <Route path={INSTALL_URL} element={<Install />} />
      </Routes>
    </EntiRoot>
  )
});

export default App
import { memo } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import Install from './Install';
import { APP_DESIGN, DESIGNER_TOKEN_NAME, DESIGN_BOARD, INDEX_URL, INSTALL_URL, LOGIN_URL, SERVER_URL, SERVICE_DESIGN } from './consts';
import { LoggedInPanel } from './Login/LoggedInPanel';
import { EntiRoot } from './enthooks';
import { Studio } from 'Studio';
import { DashboardRoutes } from 'Studio/Routes';
import { AppManager } from 'Studio/AppManager';
import { ServiceManager } from 'Studio/ServiceManager';
import { ConfigRoot } from 'common/ConfigRoot';
import { StyledThemeRoot } from 'common/StyledThemeRoot';
import { ServiceDesigner } from 'Studio/ServiceDesigner';
import { ServiceRoutes } from 'Studio/ServiceDesigner/Routes';
import { ServiceModel } from 'Studio/ServiceDesigner/ServiceModel';
import AppDesigner from 'Studio/AppDesigner';
import ApiBoard from 'Studio/AppDesigner/ApiBoard';
import { AuthBoard, AuthRoutes } from 'Studio/AppDesigner/AppAuth';
import { MenuAuthBoard } from 'Studio/AppDesigner/AppAuth/MenuAuthBoard';
import { ModelAuthBoard } from 'Studio/AppDesigner/AppAuth/ModelAuthBoard';
import { PageAuthBoard } from 'Studio/AppDesigner/AppAuth/PageAuthBoard';
import { AppBpmn } from 'Studio/AppDesigner/AppBpmn';
import AppConfig from 'Studio/AppDesigner/AppConfig';
import { AppDesignBoard } from 'Studio/AppDesigner/AppDesignBoard/inex';
import { AppEntryRouts } from 'Studio/AppDesigner/AppDesignerHeader/AppEntryRouts';
import { AppFrames } from 'Studio/AppDesigner/AppDesignerHeader/AppFrames';
import AppUis from 'Studio/AppDesigner/AppDesignerHeader/AppUis';
import { AppDmn } from 'Studio/AppDesigner/AppDmn';
import { AppModel } from 'Studio/AppDesigner/AppModel';

const App = memo(() => {
  return (
    <EntiRoot config={{ endpoint: SERVER_URL, appId: "", tokenName: DESIGNER_TOKEN_NAME }} >
      <ConfigRoot>
        <StyledThemeRoot>
          <Routes>
            <Route path={INDEX_URL} element={<LoggedInPanel />}>
              <Route path={INDEX_URL} element={<Studio />}>
                <Route path={""} element={<AppManager />} />
                <Route path={DashboardRoutes.AppManager} element={<AppManager />} />
                <Route path={DashboardRoutes.Services} element={<ServiceManager />} />
              </Route>
              <Route path={`/${SERVICE_DESIGN}/:serviceId`} element={<ServiceDesigner />}>
                <Route path={''} element={<ServiceModel />} />
                <Route path={ServiceRoutes.Model} element={<ServiceModel />} />
              </Route>
              <Route path={`/${APP_DESIGN}`} element={<AppDesigner />}>
                <Route path=":appId">
                  <Route path={DESIGN_BOARD} element={<AppDesignBoard />}>
                    <Route path={AppEntryRouts.AppUis} element={<AppUis />} />
                    <Route path={AppEntryRouts.Bpmn} element={<AppBpmn />} />
                    <Route path={AppEntryRouts.Dmn} element={<AppDmn />} />
                    <Route path={AppEntryRouts.Uml} element={<AppModel />} />
                    <Route path={AppEntryRouts.Api} element={<ApiBoard />} />
                    <Route path={AppEntryRouts.Frame} element={<AppFrames />} />
                    <Route path={AppEntryRouts.Auth} element={<AuthBoard />}>
                      <Route path={AuthRoutes.MenuAuth} element={<MenuAuthBoard />} />
                      <Route path={AuthRoutes.ComponentAuth} element={<PageAuthBoard />} />
                      <Route path={AuthRoutes.ModelAuth} element={<ModelAuthBoard />} />
                      <Route path="" element={<MenuAuthBoard />} />
                    </Route>
                    <Route path={AppEntryRouts.Config} element={<AppConfig />}></Route>
                    <Route path="" element={<AppModel />}></Route>
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
        </StyledThemeRoot>
      </ConfigRoot>
    </EntiRoot>

  )
});

export default App
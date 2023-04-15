import { memo } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './Login';
import AppDesigner from './AppDesigner/index';
import Install from './Install';
import { APP_DESIGN, DESIGNER_TOKEN_NAME, DESIGN_BOARD, INDEX_URL, INSTALL_URL, LOGIN_URL, SERVER_URL, SERVICE_DESIGN } from './consts';
import { LoggedInPanel } from './Login/LoggedInPanel';
import { AppBpmn } from './AppDesigner/AppBpmn';
import { AppDmn } from './AppDesigner/AppDmn';
import AppConfig from './AppDesigner/AppConfig';
import { UmlEditor } from 'UmlEditor';
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
import { AppEntryRouts } from 'AppDesigner/AppDesignerHeader/AppEntryRouts';
import { AppFrames } from 'AppDesigner/AppDesignerHeader/AppFrames';
import AppUis from 'AppDesigner/AppDesignerHeader/AppUis';
import { ConfigRoot } from 'common/ConfigRoot';
import { StyledThemeRoot } from 'common/StyledThemeRoot';
import { ServiceRoutes } from 'ServiceDesigner/Routes';
import { ServiceModel } from 'ServiceDesigner/ServiceModel';

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
                    <Route path={AppEntryRouts.Uml} element={<UmlEditor />} />
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
        </StyledThemeRoot>
      </ConfigRoot>
    </EntiRoot>

  )
});

export default App
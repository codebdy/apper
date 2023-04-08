import { QuestionCircleOutlined, GithubOutlined, HomeOutlined, DownOutlined, ApiOutlined, SettingOutlined, DesktopOutlined, LayoutOutlined } from "@ant-design/icons"
import { Button, Divider, Menu, Space } from "antd"
import { useCallback } from "react"
import { memo } from "react"
import { useMatch, useNavigate } from "react-router-dom"
import { IApp } from "model"
import { AppEntryRouts } from "./AppEntryRouts"
import { useTranslation } from "react-i18next"
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage"
import SvgIcon from "common/SvgIcon"
import { DESIGN, DESIGN_BOARD } from "consts"
import { useEdittingAppId } from "designer/hooks/useEdittingAppUuid"
import { Operate } from "./Operate"
import styled from "styled-components"
import { useToken } from "antd/es/theme/internal"
import AvatarMenu from "components/AvatarMenu"
import SelectLang from "components/LangSelect"

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
`

const StyleMenu = styled(Menu)`
  flex: 1;
  display: flex;
  min-width: 400px;
  justify-content: start;
  margin-left: 24px;
  border-bottom: 0;
  margin-left: 100px;
`

const DesignerHeader = memo((props: {
  app?: IApp,
}) => {
  const { app } = props;
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/")
  }, [navigate]);

  const { t } = useTranslation();
  const [, token] = useToken()

  const appId = useEdittingAppId();
  const match = useMatch(`/${DESIGN}/${appId}/${DESIGN_BOARD}/*`)
  const parse = useParseLangMessage();
  const handleSelect = useCallback((info: any) => {
    navigate(`/${DESIGN}/${appId}/${DESIGN_BOARD}/${info.key}`)
  }, [appId, navigate]);

  return (
    <StyledHeader style={{ backgroundColor: token.colorBgContainer }}>
      <Button type="text" shape="circle" size="large" onClick={handleBack}><HomeOutlined /></Button>
      <Divider type='vertical' />
      <div className="app-title" style={{ marginLeft: "4px" }}>{parse(app?.title)}</div>
      <StyleMenu
        mode="horizontal"
        defaultSelectedKeys={[match?.params?.["*"]?.split("/")?.[0] || AppEntryRouts.AppUis]}
        onSelect={handleSelect}
        items={[
          {
            key: AppEntryRouts.Ui,
            label: <>
              {
                t("AppEntry.UIDesign")
              }
              <DownOutlined style={{ fontSize: 10, marginLeft: 8 }} />
            </>,
            icon: <DesktopOutlined />,
            children: [
              {
                key: AppEntryRouts.AppUis,
                label: t("AppEntry.PageDesign"),
                icon: <SvgIcon>
                  <svg style={{ width: "14px", height: "14px" }} viewBox="0 0 1024 1024">
                    <path d="M381.6 864H162.4c-6.9 0-12.4 4.6-12.4 10.3v19.3c0 5.7 5.6 10.3 12.4 10.3h219.1c6.8 0 12.4-4.6 12.4-10.3v-19.3c0.1-5.7-5.5-10.3-12.3-10.3zM382 780.6H162c-6.9 0-12.5 4.6-12.5 10.3v19.3c0 5.7 5.6 10.3 12.5 10.3h220c6.9 0 12.5-4.6 12.5-10.3v-19.3c0-5.7-5.6-10.3-12.5-10.3zM162.4 737.2h219.1c6.8 0 12.4-4.6 12.4-10.3v-19.3c0-5.7-5.6-10.3-12.4-10.3H162.4c-6.9 0-12.4 4.6-12.4 10.3v19.3c0 5.7 5.6 10.3 12.4 10.3z" />
                    <path d="M977.1 0H46.9C21 0 0 21 0 46.9v930.2c0 25.9 21 46.9 46.9 46.9h930.2c25.9 0 46.9-21 46.9-46.9V46.9C1024 21 1003 0 977.1 0z m-18.7 911.6c0 25.9-21 46.9-46.9 46.9H112.4c-25.9 0-46.9-21-46.9-47V112.4c0-25.9 21-46.9 46.9-46.9h799.1c25.9 0 46.9 21 46.9 46.9v799.2z" />
                    <path d="M207.9 342.7h608.2c32 0 57.9-25.9 57.9-57.9v-83c0-32-25.9-57.9-57.9-57.9H207.9c-32 0-57.9 25.9-57.9 57.9v83c0 32 25.9 57.9 57.9 57.9zM200 201.8c0-4.4 3.5-7.9 7.9-7.9h608.2c4.4 0 7.9 3.5 7.9 7.9v83c0 4.4-3.5 7.9-7.9 7.9H207.9c-4.4 0-7.9-3.5-7.9-7.9v-83zM806.4 405.7h-277c-37.3 0-67.6 30.2-67.6 67.6v363.2c0 37.3 30.2 67.6 67.6 67.6h277c37.3 0 67.6-30.2 67.6-67.6V473.3c0-37.4-30.2-67.6-67.6-67.6zM824 836.4c0 9.7-7.9 17.6-17.6 17.6h-277c-9.7 0-17.6-7.9-17.6-17.6V473.3c0-9.7 7.9-17.6 17.6-17.6h277c9.7 0 17.6 7.9 17.6 17.6v363.1zM272 649.7c67.4 0 122-54.6 122-122s-54.6-122-122-122-122 54.6-122 122 54.6 122 122 122z m0-204c45.2 0 82 36.8 82 82s-36.8 82-82 82-82-36.8-82-82 36.8-82 82-82z" />
                  </svg>
                </SvgIcon>
              },
              {
                key: AppEntryRouts.Frame,
                label: t("AppEntry.FrameDesign"),
                icon: <LayoutOutlined />
              },
            ]
          },

          {
            key: AppEntryRouts.Business,
            label: <>
              {t("AppEntry.Business")}
              <DownOutlined style={{ fontSize: 10, marginLeft: 8 }} />
            </>,
            icon: <SvgIcon>
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4124"><path d="M480 289h256c17.7 0 32-14.3 32-32s-14.3-32-32-32H480c-17.7 0-32 14.3-32 32s14.3 32 32 32z" p-id="4125"></path><path d="M897 480h-1V127c0-34.2-27.8-62-62-62H382c-34.2 0-62 27.8-62 62v33H190c-34.2 0-62 27.8-62 62v258h-1c-34.2 0-62 27.8-62 62v355c0 34.2 27.8 62 62 62h770c34.2 0 62-27.8 62-62V542c0-34.2-27.8-62-62-62zM384 129h448v351H660c-28.7 0-52 23.3-52 52v44H416v-44c0-21.6-13.2-40.1-32-48V129z m-192 95h128v256H192V224z m703 671H129V544h223v44c0 28.7 23.3 52 52 52h216c28.7 0 52-23.3 52-52v-44h223v351z" p-id="4126"></path><path d="M480 416h256c17.7 0 32-14.3 32-32s-14.3-32-32-32H480c-17.7 0-32 14.3-32 32s14.3 32 32 32z" p-id="4127"></path></svg>
          </SvgIcon>,
            children: [
              {
                key: AppEntryRouts.Uml,
                label: t("AppEntry.UMLModel"),
                icon: <SvgIcon>
                <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 1024 1024" version="1.1"><path d="M513.89 950.72c-5.5 0-11-1.4-15.99-4.2L143.84 743c-9.85-5.73-15.99-16.17-15.99-27.64V308.58c0-11.33 6.14-21.91 15.99-27.64L497.9 77.43c9.85-5.73 22.14-5.73 31.99 0l354.06 203.52c9.85 5.73 15.99 16.17 15.99 27.64V715.5c0 11.33-6.14 21.91-15.99 27.64L529.89 946.52c-4.99 2.8-10.49 4.2-16 4.2zM191.83 697.15L513.89 882.2l322.07-185.05V326.92L513.89 141.87 191.83 326.92v370.23z m322.06-153.34c-5.37 0-10.88-1.4-15.99-4.33L244.29 393.91c-15.35-8.79-20.6-28.27-11.77-43.56 8.83-15.28 28.41-20.5 43.76-11.72l253.61 145.7c15.35 8.79 20.6 28.27 11.77 43.56-6.01 10.32-16.76 15.92-27.77 15.92z m0 291.52c-17.66 0-31.99-14.26-31.99-31.84V530.44L244.55 393.91s-0.13 0-0.13-0.13l-100.45-57.69c-15.35-8.79-20.6-28.27-11.77-43.56s28.41-20.5 43.76-11.72l354.06 203.52c9.85 5.73 15.99 16.17 15.99 27.64v291.39c-0.13 17.71-14.46 31.97-32.12 31.97z m0 115.39c-17.66 0-31.99-14.26-31.99-31.84V511.97c0-17.58 14.33-31.84 31.99-31.84s31.99 14.26 31.99 31.84v406.91c0 17.7-14.33 31.84-31.99 31.84z m0-406.91c-11 0-21.75-5.73-27.77-15.92-8.83-15.28-3.58-34.64 11.77-43.56l354.06-203.52c15.35-8.79 34.8-3.57 43.76 11.72 8.83 15.28 3.58 34.64-11.77 43.56L529.89 539.61c-4.99 2.93-10.49 4.2-16 4.2z"></path></svg>
              </SvgIcon>

              },
              {
                key: AppEntryRouts.Bpmn,
                label: t("AppEntry.BPMNFlow"),
                icon: <SvgIcon>
                  <svg style={{ width: "15px", height: "15px" }} viewBox="0 0 1024 1024">
                    <path d="M480 384h320a96.11 96.11 0 0 0 96-96V160a96.11 96.11 0 0 0-96-96H480a96.11 96.11 0 0 0-96 96v32H224a96.11 96.11 0 0 0-96 96v160a96.11 96.11 0 0 0 96 96h576a32 32 0 0 1 32 32v160a32 32 0 0 1-32 32H640v-32a96.11 96.11 0 0 0-96-96H224a96.11 96.11 0 0 0-96 96v128a96.11 96.11 0 0 0 96 96h320a96.11 96.11 0 0 0 96-96v-32h160a96.11 96.11 0 0 0 96-96V576a96.11 96.11 0 0 0-96-96H224a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32h160v32a96.11 96.11 0 0 0 96 96z m96 480a32 32 0 0 1-32 32H224a32 32 0 0 1-32-32V736a32 32 0 0 1 32-32h320a32 32 0 0 1 32 32zM448 160a32 32 0 0 1 32-32h320a32 32 0 0 1 32 32v128a32 32 0 0 1-32 32H480a32 32 0 0 1-32-32z" p-id="6008"></path>
                  </svg>
                </SvgIcon>
              },
              {
                key: AppEntryRouts.Dmn,
                label: t("AppEntry.DMN"),
                icon: <SvgIcon>
                  <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 900 900">
                    <path d="M341 316h-50V181c0-19.9-16.1-36-36-36s-36 16.1-36 36v135h-52c-19.9 0-36 16.1-36 36s16.1 36 36 36h174c19.9 0 36-16.1 36-36s-16.1-36-36-36zM341 422H167c-19.9 0-36 16.1-36 36s16.1 36 36 36h51v352c0 19.9 16.1 36 36 36s36-16.1 36-36V494h51c19.9 0 36-16.1 36-36s-16.1-36-36-36zM599 608H424c-19.9 0-36 16.1-36 36s16.1 36 36 36h52v166c0 19.9 16.1 36 36 36s36-16.1 36-36V680h51c19.9 0 36-16.1 36-36s-16.1-36-36-36zM599 502h-52V181c0-19.9-16.1-36-36-36s-36 16.1-36 36v321h-51c-19.9 0-36 16.1-36 36s16.1 36 36 36h175c19.9 0 36-16.1 36-36s-16.1-36-36-36zM678 389h174c19.9 0 36-16.1 36-36s-16.1-36-36-36h-50V182c0-19.9-16.1-36-36-36s-36 16.1-36 36v135h-52c-19.9 0-36 16.1-36 36s16.1 36 36 36zM852 423H678c-19.9 0-36 16.1-36 36s16.1 36 36 36h51v352c0 19.9 16.1 36 36 36s36-16.1 36-36V495h51c19.9 0 36-16.1 36-36s-16.1-36-36-36z" p-id="7106"></path>
                  </svg>
                </SvgIcon>
              },
              {
                key: AppEntryRouts.LogicFlow,
                label: t("AppEntry.LogicFlow"),
                icon: <SvgIcon>
                  <svg  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4989"><path d="M814.795699 88.086022c66.890323 0 121.11828 54.227957 121.118279 121.118279s-54.227957 121.11828-121.118279 121.11828c-56.127312 0-103.335914-38.179785-117.077333-89.985377v1.16714h-205.901076a32.300043 32.300043 0 0 0-32.261505 30.686968l-0.038538 1.60757V475.664516h101.243871c14.137806-51.211011 61.054624-88.818237 116.769033-88.818236 66.890323 0 121.11828 54.227957 121.118279 121.118279s-54.227957 121.11828-121.118279 121.11828c-55.708903 0-102.62572-37.607226-116.769033-88.818237h-101.243871v209.936516a32.300043 32.300043 0 0 0 30.686968 32.261506l1.60757 0.033032h205.901075v1.16714C711.459785 731.857204 758.673892 693.677419 814.795699 693.677419c66.890323 0 121.11828 54.227957 121.118279 121.11828s-54.227957 121.11828-121.118279 121.118279c-56.127312 0-103.335914-38.179785-117.077333-89.985376v1.16714h-205.901076c-52.691957 0-95.562323-42.061075-96.867096-94.43372l-0.033033-2.460904V540.259097l-68.949333 0.005505c-14.137806 51.211011-61.054624 88.818237-116.763527 88.818237-66.890323 0-121.11828-54.227957-121.118279-121.11828s54.227957-121.11828 121.118279-121.118279c55.708903 0 102.631226 37.607226 116.769032 88.823742l68.943828-0.005506V273.798882c0-52.686452 42.061075-95.556817 94.433721-96.861592l2.460903-0.033032h205.901075v1.16714C711.459785 126.265806 758.673892 88.086022 814.795699 88.086022z m0 670.185978c-31.215484 0-56.523699 25.308215-56.523699 56.523699 0 31.215484 25.308215 56.523699 56.523699 56.523699 31.215484 0 56.523699-25.308215 56.523699-56.523699 0-31.215484-25.308215-56.523699-56.523699-56.523699zM677.530151 451.44086c-31.215484 0-56.523699 25.308215-56.523699 56.523699 0 31.215484 25.308215 56.518194 56.523699 56.518194 31.215484 0 56.518194-25.30271 56.518193-56.518194S708.745634 451.44086 677.530151 451.44086zM209.204301 451.44086c-31.215484 0-56.523699 25.308215-56.523699 56.523699 0 31.215484 25.308215 56.518194 56.523699 56.518194 31.215484 0 56.523699-25.30271 56.523699-56.518194S240.419785 451.44086 209.204301 451.44086z m605.591398-298.760258c-31.215484 0-56.523699 25.308215-56.523699 56.523699 0 31.215484 25.308215 56.523699 56.523699 56.523699 31.215484 0 56.523699-25.308215 56.523699-56.523699 0-31.215484-25.308215-56.523699-56.523699-56.523699z" fill="currentColor" p-id="4990"></path></svg>
                </SvgIcon>
              },
            ]
          },
          {
            key: AppEntryRouts.Api,
            label: t("AppEntry.AppApi"),
            icon: <ApiOutlined />,
          },
          {
            key: AppEntryRouts.Auth,
            label: t("AppEntry.ModelAuth"),
            icon: <SvgIcon>
              <svg style={{ width: "15px", height: "15px" }} viewBox="0 0 1024 1024" version="1.1"><path d="M936.91319 88.823861a27.370771 27.370771 0 0 0-18.982318-7.167597c-277.055212 6.143655-388.231738-75.417303-388.704327-75.889892a27.213241 27.213241 0 0 0-33.435661 0c-1.535914 0-104.442135 75.811128-359.285671 75.811127-9.806219 0-20.085026 0-30.954569-0.472589a25.401651 25.401651 0 0 0-18.50973 7.167598 26.583123 26.583123 0 0 0-8.270305 18.903554v372.557541c0 4.135152-5.198477 405.835672 424.699844 543.162114a22.251058 22.251058 0 0 0 8.270305 1.063325c2.756768-0.078765 5.552919-0.393824 8.270305-1.063325C935.337894 893.760815 944.592759 484.93208 945.183495 480.324339V107.294209a28.434096 28.434096 0 0 0-8.270305-18.470348z m-45.801735 45.014088v346.368242c0 3.623181-10.239425 370.430891-379.370697 490.389694-384.096585-126.96887-379.961433-474.991174-379.961433-489.798957v-346.958979h4.135152c218.848019 0 333.096372-51.669714 375.235545-76.795688 42.729908 25.125974 156.505673 76.795688 375.235544 76.795688h4.725889z" p-id="8408"></path><path d="M679.470416 452.953568h-29.576185V393.761815A118.462271 118.462271 0 0 0 531.786401 275.73275a118.462271 118.462271 0 0 0-118.107829 118.068447V452.953568h-29.65495a29.694333 29.694333 0 0 0-29.576185 29.536803v236.294423a29.694333 29.694333 0 0 0 29.536803 29.576186h295.368029a29.694333 29.694333 0 0 0 29.536803-29.536803v-236.294424a29.418656 29.418656 0 0 0-29.418656-29.536803zM457.905012 393.761815c0-41.312142 32.451101-73.842007 73.881389-73.842007 41.469671 0 73.88139 32.411718 73.88139 73.842007V452.953568H457.905012V393.879962z m206.75762 310.057666H398.792023v-206.718238h265.870609v206.75762z" p-id="8409"></path><path d="M512.095199 512.027174c-22.369205 0-39.500551 20.47885-39.500551 47.298267 0 16.934434 7.482657 32.529866 19.691202 40.997082v45.683589c0 12.996193 8.821658 23.550678 19.691202 23.550678s19.691202-10.554484 19.691202-23.59006v-45.644207c11.893486-7.797716 19.691202-23.550678 19.691202-40.997082 0.118147-26.780035-17.013198-47.298267-39.264257-47.298267z" p-id="8410"></path></svg>
            </SvgIcon>
          },
          {
            key: AppEntryRouts.Plugins,
            label: t("AppEntry.Plugins"),
            icon:
              <SvgIcon>
                <svg style={{ width: "15px", height: "15px" }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1008.467286 581.785332a204.367259 204.367259 0 0 0-42.223726-62.920546 200.493523 200.493523 0 0 0-62.58851-41.94703 189.647061 189.647061 0 0 0-146.482572-2.158224c-4.482466 2.158225-8.798915 3.763058-13.060025 5.921282V382.232573a99.056971 99.056971 0 0 0-28.665649-70.446661A96.013321 96.013321 0 0 0 645.442856 282.234838h-56.169177a202.098357 202.098357 0 0 0 0.719408-159.763953 204.754633 204.754633 0 0 0-42.611099-63.473936 210.288542 210.288542 0 0 0-63.031223-43.053813 197.560551 197.560551 0 0 0-155.502843 0A208.960404 208.960404 0 0 0 265.816698 58.941609a205.972093 205.972093 0 0 0-42.611099 63.473937 195.7897 195.7897 0 0 0-16.159014 79.079559 188.152906 188.152906 0 0 0 12.285278 67.790386q2.600937 6.474674 5.533909 12.894007H100.186802A100.606466 100.606466 0 0 0 0.189066 382.232573v118.370314a91.364838 91.364838 0 0 0 12.1746 46.81687 49.805181 49.805181 0 0 0 36.025748 23.13174 76.201927 76.201927 0 0 0 36.46846-6.474674c8.632898-4.316449 17.708509-8.632898 26.950137-12.894008a55.94782 55.94782 0 0 1 10.127053-3.818397 111.28691 111.28691 0 0 1 90.756108-1.051443 108.464616 108.464616 0 0 1 36.523799 24.736573 110.346145 110.346145 0 0 1 24.681234 37.13253 114.441238 114.441238 0 0 1 8.964933 45.710088 111.010215 111.010215 0 0 1-8.854255 44.658646 112.947083 112.947083 0 0 1-24.791912 36.579138 108.741312 108.741312 0 0 1-36.800495 24.736573c-29.385057 13.004686-58.825453 16.269692-87.380423 1.549495-2.268903-0.996104-5.035857-2.656276-11.067818-5.533909-4.427127-2.047546-9.462984-5.533909-13.004686-7.470777a57.441975 57.441975 0 0 0-70.55734-2.268903c-15.328928 12.561973-27.669545 25.455981-29.883108 48.64306a31.930655 31.930655 0 0 0-0.332035 6.474674v123.738205a93.578401 93.578401 0 0 0 29.606413 69.94861A96.67739 96.67739 0 0 0 99.799428 1023.778644h545.145376a94.961878 94.961878 0 0 0 70.169966-29.053023 96.345356 96.345356 0 0 0 28.942344-69.948609v-89.593987a122.963458 122.963458 0 0 0 13.060025 5.921283 192.026642 192.026642 0 0 0 146.482571-1.604834 194.295545 194.295545 0 0 0 62.64385-42.611099 202.430391 202.430391 0 0 0 42.113048-61.869103 192.469355 192.469355 0 0 0 15.439606-76.921335 195.457666 195.457666 0 0 0-15.328928-76.312605z m-56.999263 126.117786a152.071819 152.071819 0 0 1-31.819976 43.330507 176.531697 176.531697 0 0 1-49.805181 31.321925c-31.709299 13.834773-73.102938 8.854254-105.144271-3.984414a148.474778 148.474778 0 0 1-41.061605-25.123947 26.562763 26.562763 0 0 0-27.669545-3.597041 25.621999 25.621999 0 0 0-14.886215 23.076401v149.415543a41.006266 41.006266 0 0 1-12.506635 30.270482 40.231518 40.231518 0 0 1-30.325821 12.838669H107.712918a42.168387 42.168387 0 0 1-30.823873-12.838669 40.618892 40.618892 0 0 1-12.78333-30.270482V813.490102c0-6.253317-0.719408-14.775537 5.921283-14.886216a38.073294 38.073294 0 0 1 14.056129 6.142639c8.024168 4.26111 14.60952 7.083404 23.297756 10.735784 40.342197 19.091986 90.424073 15.937658 131.375-1.82619a181.733572 181.733572 0 0 0 64.47004-52.627475 268.339247 268.339247 0 0 0 28.997683-50.690606 165.353201 165.353201 0 0 0 0-126.671177c-8.134846-19.258003-19.811394-42.389743-34.420914-57.331297-46.484836-46.152801-127.279907-65.244787-187.710193-39.899484-5.533909 2.047546-10.071714 4.095093-13.834773 5.533909-8.024168 4.095093-15.882319 7.692134-23.519113 11.067818-3.04365 1.051443-5.146535 1.549495-6.0873 2.047546a52.738153 52.738153 0 0 1-2.766954-16.933762V382.730625a41.448978 41.448978 0 0 1 13.060025-30.768534 40.342197 40.342197 0 0 1 30.823873-13.336721h175.424915a25.621999 25.621999 0 0 0 20.08809-41.559656C293.486243 284.891114 280.149522 276.700929 274.670953 262.146748A127.999315 127.999315 0 0 1 266.370089 215.82793a163.416333 163.416333 0 0 1 11.067818-60.430287A182.618997 182.618997 0 0 1 312.910264 105.14975a150.743681 150.743681 0 0 1 44.271272-30.270483 135.63611 135.63611 0 0 1 106.804443 0 150.743681 150.743681 0 0 1 44.271272 30.270483c12.78333 12.78333 22.965722 33.203454 29.993787 50.137215a162.420229 162.420229 0 0 1 11.067818 60.430286c0.664069 31.543281-10.34841 56.667228-30.823873 80.629055a25.621999 25.621999 0 0 0 19.534699 42.057708h100.163753a39.733467 39.733467 0 0 1 30.104465 12.838669 42.943134 42.943134 0 0 1 12.78333 31.266586v157.771745a25.677338 25.677338 0 0 0 42.334403 19.534699c12.229939-10.403749 23.353096-21.360889 41.061605-30.159804a140.671967 140.671967 0 0 1 148.97283 18.815291 127.556602 127.556602 0 0 1 37.464564 45.544071c9.905697 18.815291 11.067818 38.29465 11.067818 56.279854a157.661067 157.661067 0 0 1-10.459088 57.607993z"></path>
                </svg>
              </SvgIcon>
          },
          {
            key: AppEntryRouts.Config,
            label: t("AppEntry.BaseConfig"),
            icon: <SettingOutlined />
          },
        ]}
      />
      <div style={{ flex: 1 }}></div>
      <Space>
        {/* <span style={{ fontSize: 13 }}>
          {t("Designer.Version")} 1.0
        </span> */}
        <Operate />
        <Button type="text" size='large' shape="circle" icon={<QuestionCircleOutlined />} />
        <Button
          type="text"
          shape="circle"
          size='large'
          icon={<GithubOutlined />}
          href="https://github.com/rxdrag/apper"
          target="_blank"
        />
        <AvatarMenu />
        <SelectLang />
      </Space>
    </StyledHeader >
  )
})

export default DesignerHeader


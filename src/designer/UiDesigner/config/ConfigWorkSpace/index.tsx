import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Collapse } from "antd";
import { BaseConfigForm } from "./BaseConfigForm";
const { Panel } = Collapse;

const MenuWorkSpace = memo(() => {

  const { t } = useTranslation();

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            width: 800,
            marginTop: 16,
          }}
        >
          <Collapse defaultActiveKey={['base']}>
            <Panel header={t("Designer.BaseConfig")} key="base">
              <BaseConfigForm />
            </Panel>
          </Collapse>
        </div>
      </div>

    </>
  )
})

export default MenuWorkSpace;
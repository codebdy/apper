import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

enum OperateEnum {
  exportJson = "exportJson",
  importJson = "importJson",
}

export const Operate = memo(() => {

  const { t } = useTranslation();

  const handleMenuClick = useCallback(({ key }: any) => {

    // if (key === OperateEnum.createVaresion) {

    // } else if (key === OperateEnum.export) {

    // } else if (key === OperateEnum.import) {

    // } else if (key === OperateEnum.publish) {

    //}
  }, [])



  return (
    <>
      <Dropdown menu={{
        onClick: handleMenuClick,
        items: [
          {
            key: OperateEnum.exportJson,
            label: t("Designer.ExportJson"),
          },
          {
            key: OperateEnum.importJson,
            label: t("Designer.ImportJson"),
          },
        ]
      }} trigger={["click"]}>
        <Button  onClick={e => e.preventDefault()} loading={false} icon={<EllipsisOutlined />}>
        </Button>
      </Dropdown>

    </>
  )
});

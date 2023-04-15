import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

enum OperateEnum {
  exportJson = "exportJson",
  generateScaffold = "GenerateScaffold"
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
            key: OperateEnum.generateScaffold,
            label: t("Designer.GenerateScaffold"),
          },
        ]
      }}>
        <Button  onClick={e => e.preventDefault()} loading={false}>
          <Space>
            {t("Designer.Operate")}
            <DownOutlined style={{ fontSize: 12 }} />
          </Space>
        </Button>
      </Dropdown>

    </>
  )
});

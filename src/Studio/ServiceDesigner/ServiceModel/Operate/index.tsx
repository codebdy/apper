import { EllipsisOutlined } from '@ant-design/icons';
import { useExportModelJson } from 'UmlEditor/hooks/useExportModelJson';
import { useImportModelJson } from 'UmlEditor/hooks/useImportModelJson';
import { useMetaId } from 'UmlEditor/hooks/useMetaId';
import { Button, Dropdown } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

enum OperateEnum {
  exportJson = "exportJson",
  importJson = "importJson",
  generateScaffold = "GenerateScaffold"
}

export const Operate = memo(() => {

  const { t } = useTranslation();
  const metaId = useMetaId();
  const expotJson = useExportModelJson(metaId);
  const importJson = useImportModelJson(metaId);

  const handleMenuClick = useCallback(({ key }: any) => {

    if (key === OperateEnum.exportJson) {
      expotJson()
    } else if (key === OperateEnum.importJson) {
      importJson()
    } 

  }, [expotJson, importJson])

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
          {
            key: OperateEnum.generateScaffold,
            label: t("Designer.GenerateScaffold"),
          },
        ]
      }} trigger={["click"]}>
        <Button  onClick={e => e.preventDefault()} loading={false} icon={<EllipsisOutlined />}>
        </Button>
      </Dropdown>

    </>
  )
});

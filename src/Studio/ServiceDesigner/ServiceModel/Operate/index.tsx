import { EllipsisOutlined } from '@ant-design/icons';
import { useMetaId } from 'UmlEditor/hooks/useMetaId';
import { Button, Dropdown } from 'antd';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useExportServiceJson } from '../hooks/useExportServiceJson';
import { useImportServiceJson } from '../hooks/useImportServiceJson';
import { useService } from 'Studio/ServiceDesigner/contexts';
import { useGetMeta } from 'UmlEditor/hooks/useGetMeta';
import { IMeta } from 'model/meta';

enum OperateEnum {
  exportJson = "exportJson",
  importJson = "importJson",
  generateScaffold = "GenerateScaffold"
}

export const Operate = memo((
  props: {
    meta?: IMeta,
  }
) => {
  const { meta } = props;
  const { t } = useTranslation();
  const metaId = useMetaId();
  const expotJson = useExportServiceJson(metaId);
  const importJson = useImportServiceJson(metaId);
  const service = useService();
  const getMeta = useGetMeta(metaId)

  const handleMenuClick = useCallback(({ key }: any) => {

    if (key === OperateEnum.exportJson) {
      expotJson({
        service,
        meta: meta ? { ...meta, content: getMeta() } : undefined,
      })
    } else if (key === OperateEnum.importJson) {
      importJson()
    }

  }, [expotJson, getMeta, importJson, meta, service])

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
        <Button onClick={e => e.preventDefault()} loading={false} icon={<EllipsisOutlined />}>
        </Button>
      </Dropdown>

    </>
  )
});

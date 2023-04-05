import { Button, Card, Dropdown, MenuProps } from "antd"
import { memo, useCallback, useMemo, useState } from "react"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SendOutlined,
  DownloadOutlined,
  DeleteOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';
import { IApp } from "model";
import styled from "styled-components";
import { Image } from "components/Image";
import { useNavigate } from "react-router-dom";
import { DESIGN, DESIGN_BOARD } from "consts";
import { UpsertAppModel } from "./AppModal/UpsertAppModel";
import { useTranslation } from "react-i18next";
import { useRemoveApp } from "designer/hooks/useRemoveApp";
import { useShowError } from "designer/hooks/useShowError";

const { Meta } = Card;

const StyledCard = styled(Card)`
  width:100%;
  overflow: hidden;
  cursor: default;
`

export const AppCard = memo((props: {
  app: IApp,
}) => {
  const { app } = props;
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const [remove, { loading, error }] = useRemoveApp();

  useShowError(error)

  const items: MenuProps['items'] = useMemo(() => [
    {
      label: t("AppManager.Export"),
      key: 'export',
      icon: <DownloadOutlined />
    },
    {
      label: t("AppManager.Publish"),
      key: 'publish',
      icon: <CloudUploadOutlined />
    },
    {
      type: 'divider',
    },
    {
      label: t('Delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
      onClick: () => remove(app.id),
      disabled: app.id === '1',
    },
  ], [app.id, remove, t]);

  const navigate = useNavigate();

  const hanldeEdit = useCallback(() => {
    navigate(`/${DESIGN}/${app.id}/${DESIGN_BOARD}`)
  }, [app.id, navigate])

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [])

  const handleOpen = useCallback(() => {
    setVisible(true);
  }, [])

  return (
    <StyledCard
      hoverable
      cover={
        <Image
          style={{ cursor: "pointer" }}
          value={app.imageUrl}
          onClick={hanldeEdit}
        />
      }
      actions={[
        <Button
          size="small"
          type="text"
          key="preview"
          icon={<SendOutlined />}
        ></Button>,
        <Button
          size="small"
          type="text"
          key="edit"
          icon={<EditOutlined />}
          onClick={hanldeEdit}
        ></Button>,
        <Button
          size="small"
          type="text"
          key="setting"
          icon={<SettingOutlined />}
          onClick={handleOpen}
        ></Button>,
        <Dropdown menu={{ items }} trigger={['click']}>
          <Button
            size="small"
            type="text"
            key="setting"
            icon={<EllipsisOutlined />}
            loading={loading}
          ></Button>
        </Dropdown>,
      ]}
    >
      <Meta
        title={app.title}
      />
      {
        visible && <UpsertAppModel app={app} visible={visible} onClose={handleClose} />
      }

    </StyledCard>
  )
})
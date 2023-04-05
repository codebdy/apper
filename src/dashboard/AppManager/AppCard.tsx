import { Button, Card, Dropdown, MenuProps } from "antd"
import { memo, useCallback } from "react"
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

const { Meta } = Card;

const StyledCard = styled(Card)`
  width:100%;
  overflow: hidden;
  cursor: default;
`
const items: MenuProps['items'] = [
  {
    label: "导出",
    key: 'export',
    icon: <DownloadOutlined />
  },
  {
    label: "发布",
    key: 'publish',
    icon: <CloudUploadOutlined />
  },
  {
    type: 'divider',
  },
  {
    label: '删除',
    key: 'delete',
    icon: <DeleteOutlined />
  },
];

export const AppCard = memo((props: {
  app: IApp,
}) => {
  const { app } = props;

  const hanldeEdit = useCallback(() => {

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
        <Button size="small" type="text" key="setting" icon={<SettingOutlined />}></Button>,
        <Dropdown menu={{ items }} trigger={['click', 'hover']}><EllipsisOutlined key="ellipsis" /></Dropdown>,
      ]}
    >
      <Meta
        title={app.title}
      />
    </StyledCard>
  )
})
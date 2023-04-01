import { Card, Dropdown, MenuProps } from "antd"
import { memo } from "react"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  SendOutlined,
  DownloadOutlined,
  DeleteOutlined,
  CloudUploadOutlined
} from '@ant-design/icons';

const { Meta } = Card;
const items: MenuProps['items'] = [
  {
    label: "导出",
    key: '0',
    icon: <DownloadOutlined />
  },
  {
    label: "发布",
    key: '1',
    icon: <CloudUploadOutlined />
  },
  {
    type: 'divider',
  },
  {
    label: '删除',
    key: '3',
    icon: <DeleteOutlined />
  },
];

export const AppCard = memo(() => {
  return (
    <Card
      style={{ width: "100%" }}
      hoverable
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SendOutlined key="preview" />,
        <EditOutlined key="edit" />,
        <SettingOutlined key="setting" />,
        <Dropdown menu={{ items }} trigger={['click', 'hover']}><EllipsisOutlined key="ellipsis" /></Dropdown>,
      ]}
    >
      <Meta
        title="Card title"
      />
    </Card>
  )
})
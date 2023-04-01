import { Avatar, Card } from "antd"
import { memo } from "react"
import { EditOutlined,EllipsisOutlined,SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
export const AppCard = memo(() => {
  return (
    <Card
      style={{ width: "100%" }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title="Card title"
      />
    </Card>
  )
})
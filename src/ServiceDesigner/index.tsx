import { Layout } from "antd";
import { memo } from "react"
import { ServiceDesignerHeader } from "./ServiceDesignerHeader";
import { Outlet } from "react-router-dom";

const { Content } = Layout;
export const ServiceDesigner = memo(()=>{
  
  return (
    <Layout>
      <ServiceDesignerHeader />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
})

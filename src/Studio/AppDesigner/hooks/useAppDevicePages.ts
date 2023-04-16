import { ID } from "shared";
import { useMemo } from "react";
import { Device } from "@rxdrag/appx-plugin-sdk";
import { gql, useQueryOne } from "enthooks";
import { IApp } from "model";

const appsGql = gql`
query queryApp($device:DeviceEnumComparisonExp!, id:ID!){
  oneApp(where:{
    id:{
      _eq:$id
    }
  }){
    id
    title
    pages(where:{
      device:{
        _eq:$device
      }
    }){
      id
      schema
      title
    }
  }
}
`

export function useAppDevicePages(id: ID, device: Device) {
  const params = useMemo(() => ({ id, device }), [device, id]);
  return useQueryOne<IApp>(
    {
      gql: appsGql,
      params,
      depEntityNames: ["App", "Page"]
    })
}
import { Device } from "@rxdrag/appx-plugin-sdk";
import { gql, useQueryOne } from "enthooks";
import { IAppDeviceConfig } from "model";
import { useMemo } from "react";
import { ID } from "shared";

const configGql = gql`
query ($appId:ID, $device:String){
  oneAppDeviceConfig(where:{
    _and:[
      {
        app:{
          id:{
            _eq:$appId
          }
        }
      },
      {
        device:{
          _eq:$device
        }
      }
    ]
  }){
    id
    device
    schemaJson
  }
}
`

export function useQueryAppDeviceConfig(appId: ID, device: Device) {
  const input = useMemo(() => ({
    gql: configGql,
    params: { appId: appId || "", device },
    depEntityNames: ["AppDeviceConfig"]
  }), [appId, device])
  const { data, error, loading } = useQueryOne<IAppDeviceConfig>(input)
  return { deviceConfig: data?.oneAppDeviceConfig, error, loading }
}
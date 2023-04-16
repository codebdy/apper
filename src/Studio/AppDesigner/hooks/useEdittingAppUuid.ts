import { useParams } from "react-router-dom";

export function useEdittingAppId() {
  const { appId = "" } = useParams();

  return appId;
}
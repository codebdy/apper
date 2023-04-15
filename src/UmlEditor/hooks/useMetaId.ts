import { metaIdState } from "UmlEditor/recoil/atoms";
import { useRecoilValue } from "recoil";

export function useMetaId(){
  const metaId = useRecoilValue(metaIdState)

  return metaId
}
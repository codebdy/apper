import { graphLogicsState, selectedGraphLogicIdState } from "UmlEditor/recoil/atoms";
import { useRecoilValue } from "recoil";
import { useMetaId } from "./useMetaId";

export function useSelectedGraphLogic() {
  const metaId = useMetaId();
  const graphs = useRecoilValue(graphLogicsState(metaId))
  const selectId = useRecoilValue(selectedGraphLogicIdState(metaId))

  return graphs?.find(graphLogic=>graphLogic.uuid === selectId)
}
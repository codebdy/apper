import { AttributeMeta, MethodMeta } from "UmlEditor/meta";
import { AssociationMeta } from "./AssociationMeta";


export interface EntityMeta {
  uuid: string;
  name: string;
  label?: string;
  packageUuid: string;
  attributes: AttributeMeta[];
  methods: MethodMeta[];
  associations: AssociationMeta[];
  root?: boolean;
}

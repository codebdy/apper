import { atomFamily } from "recoil";

import { EntityMeta } from "../model/EntityMeta";
import { PackageMeta, ClassMeta } from "AppDesigner/AppUml/meta";

export const packagesState = atomFamily<PackageMeta[], string>({
  key: "designer.packages",
  default: [],
})

export const classesState = atomFamily<ClassMeta[], string>({
  key: "designer.classes",
  default: [],
})

export const entitiesState = atomFamily<EntityMeta[], string>({
  key: "designer.entities",
  default: [],
})

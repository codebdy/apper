import { RelationMeta } from "./RelationMeta";
import { PackageMeta } from "./PackageMeta";
import { ClassMeta } from "./ClassMeta";
import { DiagramMeta } from "./DiagramMeta";
import { X6NodeMeta } from "./X6NodeMeta";
import { X6EdgeMeta } from "./X6EdgeMeta";
import { MethodMeta } from "./MethodMeta";
import { CodeMeta } from "./CodeMeta";

export interface MetaContent {
  id?: number;
  packages?: PackageMeta[];
  classes?: ClassMeta[];
  diagrams?: DiagramMeta[];
  relations?: RelationMeta[];
  scriptLogics?: MethodMeta[];
  graphLogics?: MethodMeta[];
  codes?: CodeMeta[];
  apis?: MethodMeta[];
  x6Nodes?: X6NodeMeta[];
  x6Edges?: X6EdgeMeta[];
}

export const CONST_ID = "id"

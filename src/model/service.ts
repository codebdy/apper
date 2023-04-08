import { MetaContent } from "designer/AppUml/meta";
import { ID } from "shared";

export enum ServiceStatus {
  runner = "runner",
}

export interface IService {
  id: ID;
  name: string;
  title?: string;
  meta?: MetaContent;
  status?: ServiceStatus;
}

export interface IServiceInput {
  id: ID;
  name: string;
  title?: string;
  meta?: MetaContent;
  status?: ServiceStatus;
}
import { ID } from "shared";

export enum ServiceStatus {
  runner = "runner",
}

export interface IService {
  id: ID;
  name: string;
  title?: string;
  metaId?: ID;
  status?: ServiceStatus;
  imageUrl?: string;
}

export interface IServiceInput {
  id?: ID;
  name?: string;
  title?: string;
  metaId?: ID;
  status?: ServiceStatus;
  imageUrl?: string;
}
import { MetaContent } from "UmlEditor/meta";
import { ID } from "shared";

export interface IMeta {
  id: ID
  name?: string
  content?: MetaContent
  publishedContent?: MetaContent
  publishedAt?: Date
  updatedAt?: Date
  createdAt?: Date
}

export interface IMetaInput {
  id?: ID
  name?: string
  content?: MetaContent
  publishedContent?: MetaContent
  publishedAt?: Date
}
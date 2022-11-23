import { FieldsType } from "plugin-sdk";
import { CardSchema } from "plugins/layouts/components/pc/Card/designer/schema";

export const ArrayCardsSchema = {
  display: {
    fieldSourceType: FieldsType.Single,
  },
  ...CardSchema
}


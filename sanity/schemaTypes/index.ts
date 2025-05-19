import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { addressType } from "./addressType";
import { authorType } from "./authorType";

import { blogCategoryType } from "./blogCategoryType";
import { blogType } from "./blogType";
import { brandType } from "./brandType";
import { productType } from "./productType";
import { blockContentType } from "./blockContentType";
import { orderType } from "./orderType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    addressType,
    authorType,
    blockContentType,

    blogCategoryType,
    blogType,
    brandType,
    productType,
    orderType
  ],
};

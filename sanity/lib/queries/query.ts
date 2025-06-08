import { defineQuery } from "next-sanity";


const BRAND_QUERY = defineQuery(`*[_type == "brand"] {
  _id,
  slug,
  image,
    title,     
  name
} | order(name asc)`);

const LATEST_BLOG_QUERY = defineQuery(`
  *[_type == "blog" && isLatest == true] | order(name asc) {
    blogcategories,
    title,
    description,
   body,
    mainImage
  }
`);

const DEAL_PRODUCTS = defineQuery(`
  *[_type == "product" && brand == "hot"] | order(name asc) {
    _id,
    name,
    images,
    category,
    price
  }

  
`);

const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[
  _type == "product" &&
  slug.current == $slug
] | order(name asc)[0]`);

const BRANDS_QUERY = defineQuery(`
  *[
    _type == "product" &&
    brand->title == $brandName
  ]
`);


export { LATEST_BLOG_QUERY, DEAL_PRODUCTS, BRAND_QUERY, PRODUCT_BY_SLUG_QUERY, BRANDS_QUERY };

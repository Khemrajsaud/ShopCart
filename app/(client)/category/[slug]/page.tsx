
// import CategoryProducts from "@/components/CategoryProducts";
// import Container from "@/components/Container";
// import { Title } from "@/components/text";
// import { getCategories } from "@/sanity/lib/queries";
// import React from "react";



// const CategoryPage = async ({
//   params,
// }: {
//    params: { slug: string };
// }) => {

//   const categories = await getCategories();
//   console.log(categories);
  
//   const {slug} = params;
//   return (
//     <div className="py-10">
//       <Container>
//         <Title>Product by Categories:{""}
//           <span className="font-bold text-green-600 capitalize tracking-wide">
//             {slug && slug}
//           </span>
//         </Title>
//         <div className="mt-5 items-center">
//         <CategoryProducts categories={categories}  slug={slug} />
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default CategoryPage;

// ✅ DO NOT use custom type PageProps
// ✅ Let Next.js infer the route params automatically


// app/(client)/category/[slug]/page.tsx

import { getCategories } from "@/sanity/lib/queries";
import Container from "@/components/Container";
import CategoryProducts from "@/components/CategoryProducts";
import { Title } from "@/components/text";

const CategoryPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const categories = await getCategories();
  const { slug } = params;

  return (
    <div className="py-10">
      <Container>
        <Title>
          Product by Categories:{" "}
          <span className="font-bold text-green-600 capitalize tracking-wide">
            {slug}
          </span>
        </Title>
        <div className="mt-5 items-center">
          <CategoryProducts categories={categories} slug={slug} />
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;











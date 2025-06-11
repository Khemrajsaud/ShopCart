

// import NoAccess from "@/components/NoAccess";
// import WishListProducts from "@/components/WishListProducts";
// import { currentUser } from "@clerk/nextjs/server";
// import React from "react";

// const WishListPage = async () => {
//   const user = await currentUser();
//   return (
//     <>
//       {user ? <WishListProducts /> : <NoAccess />}
//     </>
//   );
// };

// export default WishListPage;



"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import WishListProducts from "@/components/WishListProducts";
import NoAccess from "@/components/NoAccess";

const WishlistClient = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null; // or show a loading spinner

  return <>{user ? <WishListProducts /> : <NoAccess />}</>;
};

export default WishlistClient;



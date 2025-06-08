import NoAccess from "@/components/NoAccess";
import WishListProducts from "@/components/WishListProducts";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const WishListPage = async () => {
  const user = await currentUser();
  return (
    <>
      {user ? <WishListProducts /> : <NoAccess />}
    </>
  );
};

export default WishListPage;


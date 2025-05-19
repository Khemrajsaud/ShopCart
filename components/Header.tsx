import Container from "./Container";
import React from "react";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CardIcon";
import FavourateButton from "./FavourateButton";

import MobileMenu from "./MobileMenu";
// import { currentUser } from "@clerk/nextjs/server";

import ClientUser from "./ClientUser";


// import { ClerkLoaded } from "@clerk/nextjs";
// import { SignedIn, UserButton } from "@clerk/clerk-react";

const Header = () => {
  // const user = await currentUser();
  // console.log(user, "user");

  return (
    <header className="bg-white py-5 border-b border-b-black/20">
      <Container className=" flex items-center justify-between">
        <div className="flex items-center gap-2.5 w-auto md:w-1/3 justify-start md:gap-0 text-lightColor ">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavourateButton />
          {/* <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!user && <SignIn />}
          </ClerkLoaded>
           */}
          <ClientUser />
         
        </div>
        {/* NavAdmin */}
      </Container>
    </header>
  );
};

export default Header;

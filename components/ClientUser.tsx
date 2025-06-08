// "use client";

// import { ClerkLoaded, SignedIn, UserButton,  } from "@clerk/clerk-react";
// import SignIn from "./SignIn";



// const ClientUser = ({ user }: { user: any }) => {
//   return (
//     <>
//       <ClerkLoaded>
//         <SignedIn>
//           <UserButton />
//           {user && <SignIn/>  }
          
//         </SignedIn>
//       </ClerkLoaded>
//     </>
//   );
// };

// export default ClientUser;

// "use client";

// import { ClerkLoaded, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// import SignIn from "./SignIn";

// const ClientUser = () => {
//   return (
//     <ClerkLoaded>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//       <SignedOut>
//         <SignIn />
//       </SignedOut>
//     </ClerkLoaded>
//   );
// };

// export default ClientUser;


"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import SignIn from "./SignIn";
import { useEffect, useState } from "react";

const ClientUser = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Ensure rendering only happens after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ClerkLoaded>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </ClerkLoaded>
  );
};

export default ClientUser;


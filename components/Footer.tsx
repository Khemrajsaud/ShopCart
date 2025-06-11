// import Container from "./Container";
// import React from "react";
// import FooterTop from "./FooterTop";
// import Logo from "./Logo";
// import SocialMedia from "./SocialMedia";
// import { SubText, SubTitle } from "./text";
// import { categoriesData, quickLinksData } from "@/constant/data";
// import Link from "next/link";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";

// const Footer = () => {
//   return (
//     <footer className="bg-white border-t">
//       <Container>
//         <FooterTop />
//         <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
//           <div className=" space-y-4">
//             <Logo />
//             <SubText>
//               Discover curated furniture collection at Shopcart, blending style
//               and comfort to elevent your living spaces
//             </SubText>
//             <SocialMedia
//               className="text-darkColor/60"
//               iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
//               tooltipClassName="bg-darkColor text-white"
//             />
//           </div>

//           <div className="">
//             <SubTitle>Quick Link</SubTitle>
//             <ul className="space-y-3 mt-4">
//               {quickLinksData.map((item) => (
//                 <li key={item?.title}>
//                   <Link
//                     href={item?.href}
//                     className="hover:text-shop_light_green hoverEffect font-medium"
//                   >
//                     {item?.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
          
//           <div>
//             <SubTitle>Categories</SubTitle>
//             <ul className="space-y-3 mt-4">
//               {categoriesData.map((item) => (
//                 <li key={`/category/${item?.title}`}>
//                   <Link
//                     href={item?.href}
//                     className="hover:text-shop_light_green hoverEffect font-medium"
//                   >
//                     {item?.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="space-y-4">
//             <SubTitle> NewsLetter</SubTitle>
//             <SubText>
//               Suscribe to our newsLetter to receive update and exclusive offers.
//             </SubText>
//             <form className="space-y-3">
//               <Input placeholder="Enter Your email" type=" email" required />
//               <Button className="w-full">Suscribe</Button>
//             </form>
//           </div>
//         </div>

//         <div className="py-6 border-t text-center text-sm text-gray-600">
//           <p>
//             @{new Date().getFullYear()}
//             {""}
//             <span className="text-darkColor font-black tracking-wider uppercase hover:text-shop_dark_green hoverEffect group font-sans">
//               Shopcar{" "}
//               <span className="text-shop_light_green group-hover:text-darkColor hoverEffect">
//                 t
//               </span>
//             </span>
//             . All rights reserved.
//           </p>
//         </div>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./text";
import { categoriesData, quickLinksData } from "@/constant/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <Container>
        {/* Top CTA or banner */}
        <FooterTop />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* Logo and Social Media */}
          <div className="space-y-5">
            <Logo />
            <SubText>
              Discover curated furniture collections at{" "}
              <span className="font-semibold text-shop_light_green">Shopcart</span>, blending style and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia
              className="text-darkColor/60"
              iconClassName="border-darkColor/60 hover:border-shop_light_green hover:text-shop_light_green"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>

          {/* Quick Links */}
          <div>
            <SubTitle className="text-lg font-semibold mb-4">Quick Links</SubTitle>
            <ul className="space-y-3">
              {quickLinksData.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop_light_green transition duration-200 font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <SubTitle className="text-lg font-semibold mb-4">Categories</SubTitle>
            <ul className="space-y-3">
              {categoriesData.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="hover:text-shop_light_green transition duration-200 font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <SubTitle className="text-lg font-semibold">Subscribe to our Newsletter</SubTitle>
            <SubText>
              Stay updated with our latest collections, discounts, and exclusive deals.
            </SubText>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border-gray-300 focus:border-shop_light_green focus:ring-1 focus:ring-shop_light_green"
                required
              />
              <Button className="w-full rounded-md">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="py-6 border-t border-gray-100 text-center text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-darkColor font-bold tracking-wide uppercase">
              Shopcar
              <span className="text-shop_light_green">t</span>
            </span>
            . All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;


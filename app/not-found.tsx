import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className=" flex flex-col items-center justify-center ">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-extrabold  text-gray-600">
            Looking for something?
          </h2>
          <p>
            We are sorry. The web address you entered is not a function page on
            our site.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <Link
              href="/help"
              className=" w-full flex items-center justify-center px-4 py-2 border
               border-gray-300 text-sm font-semibold rounded-md text-amazonBlue
                bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
                 focus:ring-offset-2 focus:-amazonBlue"
            >
              Help
            </Link>
          </div>
        </div >
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">Need help? visit the {""}
                <Link href="help" className="font-medium text-amaazon-blue 
                hover:text-amazon-blue-dark">Help Section</Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

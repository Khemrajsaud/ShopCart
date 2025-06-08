"use  client";
import React from "react";
import { Title } from "./text";
import { getLatestBlogs } from "@/sanity/lib/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs"

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();

  
  console.log(blogs);

  return (
    <div className="mb-10 lg:mb-20">
      <Title>Latest Blog</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <div key={blog?._id ?? `${blog?.slug?.current}-${index}`}>
              {" "}
              {/* ✅ fallback if _id is missing */}
              {blog?.mainImage && (
                <Link href={`/blog/${blog?.slug?.current}`}>
                  
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt={blog?.title || "blogImage"}
                    width={400}
                    height={300}
                    className="rounded-md object-cover w-full max-h-80"
                  />
                </Link>
              )}
           <div className="bg-shop_lighter_bg p-5">
          <div className="text-xs flex items-center gap-5">
            <div className="flex items-center relative group cursor-pointer gap-2">
                {/* {blog?.blogcategories?.map((item,index)=>(
                    <p key={index}>{item?.blogcategories}</p>
                ))} */}
                <p className="font-semibold text-shop_dark_green tracking-wide border-b-1 border-b-lightColor/30 hover:border-b-shop_dark_green">{blog?.title}</p>
              
                <p className="flex items-center gap-1 border-b-1 border-b-lightColor/30 hover:border-b-shop_dark_green ">
                    <Calendar size={15}/>{" "}
                    {dayjs(blog.publishedAt).format("MMMM d, YYYY")}
                    
   
                    
                </p>
                
            </div>
          </div>
        </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
        
      </div>
    </div>
  );
};

export default LatestBlog;

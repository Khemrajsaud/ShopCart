// // Querying with "sanityFetch" will keep content automatically updated
// // Before using it, import and render "<SanityLive />" in your layout, see
// // https://github.com/sanity-io/next-sanity#live-content-api for more information.
// import { defineLive } from "next-sanity";
// import { client } from './client'
// import { Token } from "@clerk/nextjs/server";

// const token = process.env.SANITY_API-READ-Token;
// if(!token){
//   throw new Error("SWANITY_API-READ-TOKEN is not set")
// }

// export const { sanityFetch, SanityLive } = defineLive({ 
// client,serverToken:token,
// browserToken: token,
// fetchOptions:{
//   revalidate:0,
// }



//   // client: client.withConfig({ 
//     // Live content is currently only available on the experimental API
//     // https://www.sanity.io/docs/api-versioning
//     // apiVersion: 'vX' 
//   // }) 

// });


import { defineLive } from "next-sanity";
import { client } from "./client";

// Make sure the environment variable is correctly named and defined
const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("SANITY_API_READ_TOKEN is not set");
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 0,
  },
});


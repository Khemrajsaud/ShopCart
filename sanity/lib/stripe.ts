
// import Stripe from "stripe"

// if(!process.env.STRIVE_SECRET_KEY){
//     throw new Error ("STRIPE_SECRET_KEY is not  defined");
// }
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
//     apiVersion: " 2025-03-31.basil",
// });

// export default stripe;

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", // Replace with actual Stripe API version you're using
});

export default stripe;

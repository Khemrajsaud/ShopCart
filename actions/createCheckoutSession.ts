// "use server";

// import { Address } from "@/sanity.types";
// import { urlFor } from "@/sanity/lib/image";
// import stripe from "@/sanity/lib/stripe";
// import { CartItem } from "@/store";

// import Stripe from "stripe";

// export interface Metadata {
//   orderNumber: string;
//   customerNumber: string;
//   customerEmail: string;
//   clerkUserId: string;
//   address?: Address | null;
// }

// export interface GrouppedCartItems {
//   product: CartItem["product"] 
//   quantity: number |undefined;
// }
// export async function createCheckoutSession(
//   items: GrouppedCartItems[] |undefined |null,
//   metadata: Metadata
// ) {
//   try {
//     //Retrieve existing customer or create a new one
//     const customers = await stripe.customers.list({
//       email: metadata.customerEmail,
//       limit: 1,
//     });
//     const customersId = customers.data?.length >0 ?  customers.data[0].id: "";

//     const sesionPayloadd: Stripe.Checkout.SessionCreateParams = {
//       metadata: {
//         orderNumber: metadata.orderNumber,
//         customerNumber: metadata.customerNumber,
//         customerEmail: metadata.customerEmail,
//         clerkUserId: metadata.clerkUserId,
//         address: JSON.stringify(metadata.address),
//       },
//       mode: "payment",
//       allow_promotion_codes: true,
//       payment_method_types: ["card"],
//       invoice_creation: {
//         enabled: true,
//       },
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
//       line_items: items?.map((item) => ({
//         price_data: {
//           currency: "USD",
//           unit_amount: Math.round(item?.product?.price! * 100),
//           product_data: {
//             name: item?.product?.name || "Unknown Product",
//             description: item?.product?.description,
//             metadata: { id: item?.product?._id },
//             images: item?.product?.images && item?.product?.images?.length>0
//             ? [urlFor(item?.product?.images[0]).url()]
//             :undefined,
//           },
//         },
//         quantity: item?.quantity,
//       })),
//     };

//     if(customersId){
//         sesionPayloadd.customer = customersId;

//     }else{
//     sesionPayloadd.customer_email = metadata.customerEmail;
//     }

//     const session = await stripe.checkout.sessions.create(sesionPayloadd)
//     return session.url
//   } catch (error) {
//     console.error(" Error creating Checkout Session", error);
//     throw error;
//   }
// }

"use server";

import { Address } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import stripe from "@/sanity/lib/stripe";
import { CartItem } from "@/store";
import Stripe from "stripe";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  address?: Address | null;
}

export interface GroupedCartItem {
  product: CartItem["product"];
  quantity: number | undefined;
}

export async function createCheckoutSession(
  items: GroupedCartItem[] | undefined | null,
  metadata: Metadata
) {
  try {
    // Step 1: Find or create Stripe customer
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    // Step 2: Prepare Checkout Session Payload
    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata.orderNumber,
        customerName: metadata.customerName,
        customerEmail: metadata.customerEmail,
        clerkUserId: metadata.clerkUserId,
        address: JSON.stringify(metadata.address),
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: items?.map((item) => ({
        price_data: {
          currency: "USD",
          unit_amount: Math.round((item?.product?.price || 0) * 100),
         

product_data: {
  name: item?.product?.name || "Unknown Product",
  description: item?.product?.description || "",
  metadata: {
    id: item?.product?._id,
  },
  images: item?.product?.images?.[0]
    ? [urlFor(item.product.images[0]).url()]
    : undefined,
}


        },
        quantity: item?.quantity || 1,
      })),
    };

    // Step 3: Attach customer or email
    if (customerId) {
      sessionPayload.customer = customerId;
    } else {
      sessionPayload.customer_email = metadata.customerEmail;
    }

    // Step 4: Create session
    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("❌ Error creating Checkout Session:", error);
    throw error;
  }
}


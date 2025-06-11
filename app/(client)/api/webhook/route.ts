// import { backendClient } from "@/sanity/lib/backendClient";
// import stripe from "@/sanity/lib/stripe";
// import { number } from "motion/react";

// import { headers } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// export async function POST(req: NextRequest) {
//   const body = await req.text();
//   const headersList = await headers();
//   const sig = headersList.get("stripe-signature");

//   if (!sig) {
//     return NextResponse.json(
//       { error: "No Signature foun for stripe" },
//       { status: 400 }
//     );
//   }
//   const webhookSecret = process.env.STRIPE_WEBOOK_SECRET;
//   if (!webhookSecret) {
//     console.log("Stripe webhook secret is not set");
//     return NextResponse.json(
//       {
//         error: "Stripe webhook secret is not set",
//       },
//       { status: 400 }
//     );
//   }
//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
//   } catch (error) {
//     console.error("webhook signature varification failed: ", error);
//     return NextResponse.json(
//       {
//         error: `Webhook Error: ${error}`,
//       },
//       { status: 400 }
//     );
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object as Stripe.Checkout.Session;

//     const invoice = session.invoice
//       ? await stripe.invoices.retrieve(session.invoice as string)
//       : null;

//     try {
//       await createOrderInSanity(session, invoice);
//     } catch (error) {
//       console.error("Error creating order in sanity:", error);
//       return NextResponse.json(
//         {
//           error: `Error creating order: ${error}`,
//         },
//         { status: 400 }
//       );
//     }
//   }
// }

// async function createOrderInSanity(
//   session: Stripe.Checkout.Session,
//   invoice: Stripe.Invoice | null
// ) {
//   const {
//     id,
//     amount_total,
//     currency,
//     metadata,
//     payment_intent,
//     total_details,
//   } = session;
//   const {orderNumber, customerName, customerEmail, clerkUserId, clerkUserId, address} = metadata as number unknown as Metadata & {address:string};
//   const parsedAddress = address ? JSON.parse(address): null;

//   const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {expand: ["data.price.product"]}

//   );

//   // Create Sanity product references and prepare stock updates
//   const sanityProducts = []
//   const stockUpdates = []
//   for (cosnt item of lineItemsWithProduct.data){
//     const productId= (item.price?.product as Stripe.Product)?.metadata.id;
//     const quantity = item?.quantity || 0;

//     if(!productId) continue;
//     sanityProducts.push({
//         _key: crypto.randomUUID(),
//         Product:{
//             _type: "reference",
//             _ref: productId,
//         },
//         quantity,
//     });
//     stockUpdates.push({productId,quantity});

//   }
// // Create order in Sanity

// const order = await backendClient.create({
//   _type: "order",
//   orderNumber,
//   stripeCheckoutSessionId: id,
//   stripePaymentIntentId : payment_intent,
//   customerName,
//   stripeCustomerId: customerEmail,
//   clerkUserId: clerkUserId,
//   email: customerEmail,
//   currency,
//   amountDiscount: total_details?.amount_discount
//   ? total_details.amount_discount/100
//   : 0,
//   products: sanityProducts,
//   totalPrice: amount_total? amount_total /100 : 0,
//   status: "paid",
//   orderDate: new Date().toISOString(),
//   invoice: invoice
//   ?{
  
//     id: invoice.id,
//     number: invoice.number,
//      hosted_invoice_url: invoice.hosted_invoice_url,
//   }
//   :null,
//   address: parsedAddress
//   ? {
//     state: parsedAddress.state,
//     zip: parsedAddress.zip,
//     city: parsedAddress.city,
//     address: parsedAddress.address,
//     name: parsedAddress.name,

//   }
//   : null,

// });

// // update stock levels in sanity
// await updateStockLevels(stockUpdates);
// return order;


// }

// // function to update stock levels
// async function updateStockLevels(
//   stockUpdates: {productId: string: quantity: number}[]

// ) {
//   for (const {product, quantity} of stockUpdates){
//     try{
//       // Fetch current stock
//       const product = await backendClient.getDocument(productId);

//       if(!product  || typeof  product.stock !== "number"){
//         console.warn(
//           `Product with ID ${productId} not found or stock is invalis.`
//         );
//         continue;
//       }

//       const newStock = Math.max(product.stock - quantity,0);
//       await backendClient.patch(productId).set({stock: newStock}).commit();

//     } catch (error){
//       console.error(`Failed to update stock for product ${productId}: `, error);
//     }
//   }
// }


import { backendClient } from "@/sanity/lib/backendClient";
import stripe from "@/sanity/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = headers();
  const sig = (await headersList).get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No Stripe signature found" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Stripe webhook secret is not set");
    return NextResponse.json({ error: "Webhook secret missing" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: `Webhook Error: ${error}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await createOrderInSanity(session, invoice);
    } catch (error) {
      console.error("Error creating order in Sanity:", error);
      return NextResponse.json({ error: `Order creation failed: ${error}` }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

// Helper function to create order
async function createOrderInSanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Invoice | null
) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    total_details,
  } = session;

  const {
    orderNumber,
    customerName,
    customerEmail,
    clerkUserId,
    address,
  } = metadata as {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
    address: string; // this will be a JSON string
  };

  const parsedAddress = address ? JSON.parse(address) : null;

  const lineItems = await stripe.checkout.sessions.listLineItems(id, {
    expand: ["data.price.product"],
  });

  const sanityProducts = [];
  const stockUpdates = [];

  for (const item of lineItems.data) {
    const product = item.price?.product as Stripe.Product;
    const productId = product?.metadata?.id;
    const quantity = item.quantity || 0;

    if (!productId) continue;

    sanityProducts.push({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: productId,
      },
      quantity,
    });

    stockUpdates.push({ productId, quantity });
  }

  // Save the order in Sanity
  const order = await backendClient.create({
    _type: "order",
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customerEmail,
    clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: "paid",
    orderDate: new Date().toISOString(),
    invoice: invoice
      ? {
          id: invoice.id,
          number: invoice.number,
          hosted_invoice_url: invoice.hosted_invoice_url,
        }
      : null,
    address: parsedAddress
      ? {
          state: parsedAddress.state,
          zip: parsedAddress.zip,
          city: parsedAddress.city,
          address: parsedAddress.address,
          name: parsedAddress.name,
        }
      : null,
  });

  await updateStockLevels(stockUpdates);
  return order;
}

// Helper function to update stock
async function updateStockLevels(
  stockUpdates: { productId: string; quantity: number }[]
) {
  for (const { productId, quantity } of stockUpdates) {
    try {
      const product = await backendClient.getDocument(productId);

      if (!product || typeof product.stock !== "number") {
        console.warn(`Product ${productId} not found or invalid stock`);
        continue;
      }

      const newStock = Math.max(product.stock - quantity, 0);
      await backendClient.patch(productId).set({ stock: newStock }).commit();
    } catch (error) {
      console.error(`Failed to update stock for product ${productId}:`, error);
    }
  }
}

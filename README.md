This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

1. Project Title
ShopCarT - E-commerce Website

2. Name
JeePeeDee Khemraj

3. Overview
ShopCarT is an e-commerce platform designed as part of a Frontend Development Internship at Digital Pathshala. The platform enables users to explore and shop for various products with a clean and responsive UI. This project aims to provide an engaging and seamless shopping experience, complete with authentication, category filtering, product search, and cart functionality. The core objective is to simulate a real-world shopping site with modern UI/UX practices.

4. Features

Purchase products from multiple categories and brands

Add to cart with dynamic quantity and stock management

Favorite product functionality

Filter products by category, brand, and price range

Responsive mobile-first design

User authentication using Clerk

Real-time toast notifications for user feedback

Blog section to display latest updates and articles

Dynamic routes and single product page with multiple images

Admin panel for managing categories and products using Sanity CMS

5. Technologies Used

Next.js

React.js

Tailwind CSS

TypeScript

Sanity CMS

Clerk (Authentication)

React Toastify

6. Screenshots
(Attach relevant screenshots of the Home Page, Product Page, Login Page, Cart, Admin Panel, etc.)

7. Setup Instructions

# Clone the repository
git clone https://github.com/yourusername/shopcart

# Navigate to the project folder
cd shopcart

# Install dependencies
npm install

# Create a .env.local file and add necessary environment variables
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_api_key

# Run the development server
npm run dev

8. Challenges Faced

Integrating Sanity with Next.js for dynamic content required deep understanding of GROQ queries.

Managing state across cart and favorite products using React's useState and useContext hooks.

Ensuring responsiveness and UI consistency across all device sizes.

Implementing authentication and route protection using Clerk.

9. Conclusion
This project was an incredible learning experience. I successfully built a functional e-commerce website from scratch using modern technologies. The real-world workflow using Sanity CMS and Clerk authentication helped me understand full-stack development concepts. Future improvements may include payment integration, order tracking, and user dashboard features.

Thanks to Digital Pathshala for this hands-on internship opportunity that has sharpened my development skills and confidence.



# UpMake - Premium Custom E-commerce Platform

UpMake is a minimalist, high-end e-commerce platform built for custom precision items. It features a modern customer storefront and a robust administrative dashboard for managing the entire product lifecycle.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Database/ORM:** [Prisma 7](https://www.prisma.io/) with Supabase (PostgreSQL)
- **Payments:** [Stripe](https://stripe.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🛠️ Admin Dashboard Usage

The Admin Dashboard is located at `/admin`. It allows you to manage your catalog and track production.

### 1. Product Management (`/admin/products`)
- **View Catalog:** See all your active products, categories, and base prices.
- **Add New Product:** Use the "Add Product" button to open the creation form.
  - **Media:** Upload multiple images (previews available).
  - **Rich Details:** Set titles, descriptions, and categories.
  - **Dynamic Variants:** Add options like "Material" or "Color" with specific price adjustments (e.g., +$15.00 for Resin).

### 2. Order Management (`/admin/orders`)
- **Order Tracking:** Monitor incoming orders from customers.
- **Status Flow:** Move orders through the pipeline:
  `Payment Confirmed` -> `In Production` -> `Quality Check` -> `Shipped`
- **Notifications:** Updating a status triggers a mock notification to the customer email.

### 3. Analytics (`/admin`)
- View high-level stats for Revenue, Order counts, and User activity.

---

## 🛍️ Storefront Features

- **Clean UI:** A typography-focused, "white-space heavy" design inspired by San Francisco/Inter fonts.
- **Interactive Product Pages:** Real-time price updates as customers select different variants.
- **Slide-out Cart:** A seamless drawer experience for managing items without leaving the page.
- **Stripe Integration:** Secure checkout flow with support for Apple Pay/Google Pay.
- **Trust Badges:** "Made in USA" and "Fast Shipping" callouts to build customer confidence.

---

## 🏗️ Getting Started

### 1. Environment Setup
Create a `.env` file in the root:

```env
# Supabase
DATABASE_URL="your-postgresql-url"
DIRECT_URL="your-direct-postgresql-url"

# Stripe
STRIPE_SECRET_KEY="your-sk-test"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-pk-test"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Installation
```bash
npm install
```

### 3. Database Initialization
```bash
npx prisma generate
# To push schema to your DB:
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 📊 Database Schema (Prisma)

- **Product:** Core item data (name, description, base price).
- **ProductVariant:** Option-specific data (name, value, price adjustment).
- **Order:** Customer order tracking (email, total, status).
- **OrderItem:** Snapshots of products and variants purchased.
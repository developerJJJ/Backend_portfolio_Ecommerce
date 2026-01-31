'use client'

import Link from 'next/link'
import { ShoppingBag, Search, Menu } from 'lucide-react'
import CartDrawer from '@/components/store/CartDrawer'
import { useCart } from '@/lib/store'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { items, setIsOpen } = useCart()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-emerald-700">
              VITALFOODS
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/shop" className="hover:text-emerald-600 transition-colors">Shop All</Link>
              <Link href="/new" className="hover:text-emerald-600 transition-colors">New Arrivals</Link>
              <Link href="/nutrition" className="hover:text-emerald-600 transition-colors">Nutrition Guide</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-emerald-50 rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 hover:bg-emerald-50 rounded-full relative"
            >
              <ShoppingBag className="h-5 w-5 text-gray-600" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-emerald-50 rounded-full text-gray-600">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>

      <CartDrawer />

      <footer className="border-t bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <span className="text-xl font-bold tracking-tighter text-emerald-700">VITALFOODS</span>
              <p className="mt-4 text-sm text-gray-500 max-w-xs">
                Premium organic health foods, sourced sustainably and delivered fresh to your door.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Shop</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><Link href="/shop" className="hover:text-emerald-600">All Products</Link></li>
                <li><Link href="/new" className="hover:text-emerald-600">New Arrivals</Link></li>
                <li><Link href="/featured" className="hover:text-emerald-600">Superfoods</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Support</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><Link href="/shipping" className="hover:text-emerald-600">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-emerald-600">Returns</Link></li>
                <li><Link href="/contact" className="hover:text-emerald-600">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
            © 2026 VitalFoods. All rights reserved. Sourced from organic farms.
          </div>
        </div>
      </footer>
    </div>
  )
}

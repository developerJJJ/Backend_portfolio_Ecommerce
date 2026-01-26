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
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              UPMAKE
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/shop" className="hover:text-black transition-colors">Shop All</Link>
              <Link href="/new" className="hover:text-black transition-colors">New Arrivals</Link>
              <Link href="/about" className="hover:text-black transition-colors">Our Process</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
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
              <span className="text-xl font-bold tracking-tighter">UPMAKE</span>
              <p className="mt-4 text-sm text-gray-500 max-w-xs">
                Premium custom-made items, crafted with precision and delivered to your door.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Shop</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><Link href="/shop" className="hover:text-black">All Products</Link></li>
                <li><Link href="/new" className="hover:text-black">New Arrivals</Link></li>
                <li><Link href="/featured" className="hover:text-black">Featured</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider">Support</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li><Link href="/shipping" className="hover:text-black">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-black">Returns</Link></li>
                <li><Link href="/contact" className="hover:text-black">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
            © 2026 UpMake. All rights reserved. Made in USA.
          </div>
        </div>
      </footer>
    </div>
  )
}

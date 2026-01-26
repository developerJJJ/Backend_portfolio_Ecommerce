'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useCart } from '@/lib/store'

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="rounded-full bg-green-50 p-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Thank you for your order!</h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          We've received your payment and our team is getting started on your custom pieces.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/admin/orders" 
            className="text-sm font-bold border-2 border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all"
          >
            Track Order (Mock)
          </Link>
          <Link 
            href="/" 
            className="text-sm font-bold bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-all flex items-center gap-2"
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

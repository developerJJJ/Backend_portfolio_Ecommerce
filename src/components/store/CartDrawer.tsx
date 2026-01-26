'use client'

import { useState } from 'react'
import { X, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react'
import { useCart } from '@/lib/store'
import { formatPrice, cn } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const { url, error } = await response.json()
      if (error) throw new Error(error)

      if (url) {
        window.location.href = url
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Something went wrong with checkout. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-bold">Your Cart ({items.length})</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
              <div className="rounded-full bg-gray-100 p-6">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <div>
                <p className="font-bold">Your cart is empty</p>
                <p className="text-sm text-gray-500">Add some unique pieces to get started.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-black px-8 py-2 text-sm font-bold text-white"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm font-bold">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-gray-400 hover:text-black"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                        {Object.entries(item.variants).map(([name, value]) => (
                          <span key={name} className="text-[10px] text-gray-500 uppercase tracking-wider">
                            {name}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-black text-gray-400"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-black text-gray-400"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t bg-gray-50 px-6 py-6 space-y-4">
            <div className="flex justify-between items-center font-bold">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Shipping and taxes calculated at checkout.
            </p>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut || items.length === 0}
              className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-900 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Checkout'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
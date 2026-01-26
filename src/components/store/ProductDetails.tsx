'use client'

import { useState } from 'react'
import { Check, Info, ShieldCheck, Truck } from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'
import { useCart } from '@/lib/store'

interface Variant {
  id: string
  name: string
  value: string
  priceAdjustment: number
}

interface Product {
  id: string
  name: string
  description: string
  basePrice: number
  images: string[]
  category: string
  variants: Variant[]
}

const mockProduct: Product = {
  id: '1',
  name: 'Minimalist Vase',
  description: 'A stunning minimalist vase designed for modern interiors. Each piece is custom-made using high-quality biodegradable PLA or premium Resin, ensuring a unique finish and durable structure. Perfect for dried flowers or as a standalone art piece.',
  basePrice: 45.00,
  images: [
    'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1612196808214-b9e1d6145a8c?auto=format&fit=crop&q=80&w=1000',
  ],
  category: 'Home Decor',
  variants: [
    { id: 'v1', name: 'Material', value: 'PLA (Matte)', priceAdjustment: 0 },
    { id: 'v2', name: 'Material', value: 'Resin (Smooth)', priceAdjustment: 15.00 },
    { id: 'v3', name: 'Color', value: 'Off-White', priceAdjustment: 0 },
    { id: 'v4', name: 'Color', value: 'Midnight Black', priceAdjustment: 0 },
    { id: 'v5', name: 'Color', value: 'Terracotta', priceAdjustment: 5.00 },
  ],
}

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selections, setSelections] = useState<Record<string, string>>({
    'Material': 'PLA (Matte)',
    'Color': 'Off-White',
  })

  const totalPrice = mockProduct.basePrice + 
    Object.entries(selections).reduce((acc, [name, value]) => {
      const variant = mockProduct.variants.find(v => v.name === name && v.value === value)
      return acc + (variant?.priceAdjustment || 0)
    }, 0)

  const variantGroups = mockProduct.variants.reduce((acc, variant) => {
    if (!acc[variant.name]) acc[variant.name] = []
    acc[variant.name].push(variant)
    return acc
  }, {} as Record<string, Variant[]>)

  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      productId: mockProduct.id,
      name: mockProduct.name,
      price: totalPrice,
      image: mockProduct.images[0],
      variants: selections,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Gallery */}
      <div className="space-y-4">
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100">
          <img 
            src={mockProduct.images[selectedImage]} 
            alt={mockProduct.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {mockProduct.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={cn(
                "w-24 aspect-square rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all",
                selectedImage === i ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-8 py-4">
        <div className="space-y-2">
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">{mockProduct.category}</span>
          <h1 className="text-4xl font-bold tracking-tight">{mockProduct.name}</h1>
          <p className="text-2xl font-medium">{formatPrice(totalPrice)}</p>
        </div>

        <div className="space-y-6">
          {Object.entries(variantGroups).map(([name, variants]) => (
            <div key={name} className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-widest">{name}</label>
                <span className="text-xs text-gray-500">{selections[name]}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelections(prev => ({ ...prev, [name]: v.value }))}
                    className={cn(
                      "px-4 py-2 text-sm font-medium border rounded-full transition-all flex items-center gap-2",
                      selections[name] === v.value 
                        ? "border-black bg-black text-white" 
                        : "border-gray-200 hover:border-black text-gray-600"
                    )}
                  >
                    {v.value}
                    {v.priceAdjustment > 0 && (
                      <span className={cn(
                        "text-[10px]",
                        selections[name] === v.value ? "text-gray-300" : "text-gray-400"
                      )}>
                        (+{formatPrice(v.priceAdjustment)})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 pt-4">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-gray-900 transition-all active:scale-[0.98]"
          >
            Add to Cart
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
              <ShieldCheck className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs font-bold uppercase">Made in USA</p>
                <p className="text-[10px] text-gray-500">Local craftsmanship</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
              <Truck className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-xs font-bold uppercase">Production</p>
                <p className="text-[10px] text-gray-500">3-5 business days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 space-y-4">
          <h4 className="font-bold flex items-center gap-2">
            Details <Info className="h-4 w-4 text-gray-400" />
          </h4>
          <p className="text-gray-600 leading-relaxed text-sm">
            {mockProduct.description}
          </p>
        </div>
      </div>
    </div>
  )
}

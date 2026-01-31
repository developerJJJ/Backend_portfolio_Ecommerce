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
  name: 'Organic Trio Quinoa',
  description: 'Our Organic Trio Quinoa is a nutrient-dense blend of white, red, and black quinoa. Sourced directly from sustainable organic farms, it is a complete protein source, high in fiber, and naturally gluten-free. Perfect for salads, bowls, or as a healthy side dish.',
  basePrice: 12.99,
  images: [
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1626082872332-901c82806961?auto=format&fit=crop&q=80&w=1000',
  ],
  category: 'Grains',
  variants: [
    { id: 'v1', name: 'Size', value: '500g', priceAdjustment: 0 },
    { id: 'v2', name: 'Size', value: '1kg', priceAdjustment: 8.00 },
    { id: 'v3', name: 'Size', value: '2.5kg', priceAdjustment: 18.00 },
    { id: 'v4', name: 'Origin', value: 'Peruvian Andes', priceAdjustment: 0 },
    { id: 'v5', name: 'Origin', value: 'Bolivian Highlands', priceAdjustment: 2.00 },
  ],
}

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selections, setSelections] = useState<Record<string, string>>({
    'Size': '500g',
    'Origin': 'Peruvian Andes',
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
        <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 shadow-inner">
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
                selectedImage === i ? "border-emerald-600 scale-105" : "border-transparent opacity-60 hover:opacity-100"
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
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">{mockProduct.category}</span>
          <h1 className="text-4xl font-bold tracking-tight text-emerald-900">{mockProduct.name}</h1>
          <p className="text-2xl font-medium text-emerald-700">{formatPrice(totalPrice)}</p>
        </div>

        <div className="space-y-6">
          {Object.entries(variantGroups).map(([name, variants]) => (
            <div key={name} className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-700">{name}</label>
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
                        ? "border-emerald-600 bg-emerald-600 text-white" 
                        : "border-gray-200 hover:border-emerald-600 text-gray-600"
                    )}
                  >
                    {v.value}
                    {v.priceAdjustment > 0 && (
                      <span className={cn(
                        "text-[10px]",
                        selections[name] === v.value ? "text-emerald-100" : "text-gray-400"
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
            className="w-full bg-emerald-600 text-white py-4 rounded-full font-bold hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-lg shadow-emerald-200"
          >
            Add to Cart
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold uppercase text-emerald-900">100% Organic</p>
                <p className="text-[10px] text-emerald-700">Certified origin</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl">
              <Truck className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold uppercase text-emerald-900">Sustainably Sourced</p>
                <p className="text-[10px] text-emerald-700">Direct trade farms</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 space-y-4">
          <h4 className="font-bold flex items-center gap-2 text-emerald-900">
            Nutritional Details <Info className="h-4 w-4 text-emerald-500" />
          </h4>
          <p className="text-gray-600 leading-relaxed text-sm">
            {mockProduct.description}
          </p>
        </div>
      </div>
    </div>
  )
}

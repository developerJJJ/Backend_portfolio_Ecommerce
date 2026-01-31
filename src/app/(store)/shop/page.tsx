import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

const products = [
  {
    id: '1',
    name: 'Organic Trio Quinoa',
    category: 'Grains',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    name: 'Cold Pressed Green Juice',
    category: 'Beverages',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '3',
    name: 'Raw Premium Almonds',
    category: 'Snacks',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1508029054763-549b808920bc?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    name: 'Matcha Green Tea Powder',
    category: 'Superfoods',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1582722872445-5f15502c3902?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '5',
    name: 'Organic Chia Seeds',
    category: 'Superfoods',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1599307767316-776533bb941c?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '6',
    name: 'Raw Manuka Honey',
    category: 'Sweeteners',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
  },
]

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-emerald-900">Shop All Superfoods</h1>
          <p className="mt-2 text-gray-500">Discover our curated selection of nutrient-dense organic foods.</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer text-emerald-700">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group space-y-4">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-3xl relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Organic
                </span>
              </div>
            </div>
            <div className="flex justify-between items-start px-2">
              <div>
                <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-700 transition-colors uppercase tracking-tight">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <span className="font-bold text-sm text-emerald-700">{formatPrice(product.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

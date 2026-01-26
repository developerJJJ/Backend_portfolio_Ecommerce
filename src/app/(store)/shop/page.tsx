import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

const products = [
  {
    id: '1',
    name: 'Minimalist Vase',
    category: 'Home Decor',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '2',
    name: 'Geometric Planter',
    category: 'Home Decor',
    price: 29.00,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '3',
    name: 'Articulated Dragon',
    category: 'Art',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1531608139434-1912ae0713cd?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: '4',
    name: 'Modular Organizer',
    category: 'Office',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1591122947157-26bad3a117d2?auto=format&fit=crop&q=80&w=600',
  },
]

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Shop All</h1>
          <p className="mt-2 text-gray-500">Browse our collection of custom-made precision items.</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-transparent text-sm font-medium border-none focus:ring-0 cursor-pointer">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group space-y-4">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-2xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-sm">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <span className="font-bold text-sm">{formatPrice(product.price)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

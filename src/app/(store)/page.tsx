import Link from 'next/link'
import { ArrowRight, ShieldCheck, Truck, Recycle } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const featuredProducts = [
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
]

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black">
            CRAFTED FOR YOU.
          </h1>
          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mx-auto font-medium">
            Discover precision-made 3D printed items and custom designs that elevate your space.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/shop" 
              className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-900 transition-all flex items-center gap-2"
            >
              Shop Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="mx-auto max-w-7xl px-4 flex flex-wrap justify-center gap-12 md:gap-24">
        {[
          { icon: ShieldCheck, title: 'Made in USA', desc: 'Sourced & crafted locally' },
          { icon: Truck, title: 'Fast Shipping', desc: '3-5 days production time' },
          { icon: Recycle, title: 'Eco-Friendly', desc: 'Sustainable materials used' },
        ].map((badge) => (
          <div key={badge.title} className="flex flex-col items-center text-center gap-2">
            <badge.icon className="h-8 w-8 text-black" />
            <span className="font-bold text-sm uppercase tracking-widest">{badge.title}</span>
            <span className="text-xs text-gray-500">{badge.desc}</span>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-gray-500">Curated picks for your modern home.</p>
          </div>
          <Link href="/shop" className="text-sm font-bold border-b-2 border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
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
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <span className="font-bold">{formatPrice(product.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

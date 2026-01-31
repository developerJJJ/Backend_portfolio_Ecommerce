import Link from 'next/link'
import { ArrowRight, ShieldCheck, Truck, Leaf } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

const featuredProducts = [
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
]

export default function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-emerald-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2000" 
            alt="Healthy Food" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        </div>
        <div className="relative z-10 text-center space-y-6 px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
            FUEL YOUR VITALITY.
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-medium drop-shadow-md">
            Premium organic superfoods and nutrition-packed essentials delivered straight to your kitchen.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/shop" 
              className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl"
            >
              Shop Superfoods <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="mx-auto max-w-7xl px-4 flex flex-wrap justify-center gap-12 md:gap-24">
        {[
          { icon: ShieldCheck, title: '100% Organic', desc: 'Certified organic sources' },
          { icon: Truck, title: 'Fresh Delivery', desc: 'Temperature controlled shipping' },
          { icon: Leaf, title: 'Sustainably Grown', desc: 'Eco-friendly farming practices' },
        ].map((badge) => (
          <div key={badge.title} className="flex flex-col items-center text-center gap-2 group">
            <div className="p-3 bg-emerald-50 rounded-full group-hover:bg-emerald-100 transition-colors">
              <badge.icon className="h-8 w-8 text-emerald-700" />
            </div>
            <span className="font-bold text-sm uppercase tracking-widest text-emerald-900">{badge.title}</span>
            <span className="text-xs text-gray-500">{badge.desc}</span>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-emerald-900">Featured Superfoods</h2>
            <p className="text-gray-500">Nutrient-dense picks for a healthier you.</p>
          </div>
          <Link href="/shop" className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-700 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group space-y-4">
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-3xl relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                    Organic
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors text-balance">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <span className="font-bold text-emerald-700">{formatPrice(product.price)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

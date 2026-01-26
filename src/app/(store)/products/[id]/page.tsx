import ProductDetails from '@/components/store/ProductDetails'

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <ProductDetails />
    </div>
  )
}

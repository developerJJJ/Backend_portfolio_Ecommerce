import ProductForm from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">New Product</h2>
        <p className="text-sm text-gray-500">Add a new product to your catalog</p>
      </div>
      
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <ProductForm />
      </div>
    </div>
  )
}

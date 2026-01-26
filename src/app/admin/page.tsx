export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Revenue', value: '$12,845.00', change: '+12% from last month' },
          { label: 'Orders', value: '456', change: '+5% from last month' },
          { label: 'Products', value: '24', change: '0% from last month' },
          { label: 'Active Users', value: '1,234', change: '+18% from last month' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold mb-4">Recent Orders</h3>
        <div className="text-sm text-gray-500">
          No orders to display yet.
        </div>
      </div>
    </div>
  )
}

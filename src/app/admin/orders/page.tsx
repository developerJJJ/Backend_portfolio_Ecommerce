'use client'

import { useState } from 'react'
import { MoreHorizontal, Search, Filter } from 'lucide-react'
import { formatPrice, cn } from '@/lib/utils'

type OrderStatus = 'PAYMENT_CONFIRMED' | 'IN_PRODUCTION' | 'QUALITY_CHECK' | 'SHIPPED'

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  PAYMENT_CONFIRMED: { label: 'Payment Confirmed', color: 'bg-blue-50 text-blue-700 ring-blue-700/10' },
  IN_PRODUCTION: { label: 'In Production', color: 'bg-yellow-50 text-yellow-700 ring-yellow-700/10' },
  QUALITY_CHECK: { label: 'Quality Check', color: 'bg-purple-50 text-purple-700 ring-purple-700/10' },
  SHIPPED: { label: 'Shipped', color: 'bg-green-50 text-green-700 ring-green-700/10' },
}

const statusOrder: OrderStatus[] = ['PAYMENT_CONFIRMED', 'IN_PRODUCTION', 'QUALITY_CHECK', 'SHIPPED']

const mockOrders = [
  {
    id: 'ORD-001',
    customer: 'james@example.com',
    total: 124.50,
    status: 'PAYMENT_CONFIRMED' as OrderStatus,
    date: '2026-01-25',
  },
  {
    id: 'ORD-002',
    customer: 'sarah@example.com',
    total: 59.00,
    status: 'IN_PRODUCTION' as OrderStatus,
    date: '2026-01-24',
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)

  const updateStatus = (orderId: string) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const currentIndex = statusOrder.indexOf(order.status)
        const nextStatus = statusOrder[currentIndex + 1] || order.status
        
        // Mock notification
        if (nextStatus !== order.status) {
          console.log(`Notification sent to ${order.customer}: Your order ${order.id} is now ${statusConfig[nextStatus].label}`)
        }
        
        return { ...order, status: nextStatus }
      }
      return order
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-sm text-gray-500">Track and manage customer orders</p>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search orders..."
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-600">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{formatPrice(order.total)}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset',
                    statusConfig[order.status].color
                  )}>
                    {statusConfig[order.status].label}
                  </span>
                </td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => updateStatus(order.id)}
                    disabled={order.status === 'SHIPPED'}
                    className="text-xs font-medium text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
                  >
                    Next Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

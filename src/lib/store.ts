import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  variants: Record<string, string>
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  setIsOpen: (isOpen: boolean) => void
  clearCart: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(
          (item) => 
            item.productId === newItem.productId && 
            JSON.stringify(item.variants) === JSON.stringify(newItem.variants)
        )

        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            isOpen: true,
          }
        }

        return {
          items: [
            ...state.items,
            { ...newItem, id: Math.random().toString(36).substr(2, 9), quantity: 1 },
          ],
          isOpen: true,
        }
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),
      setIsOpen: (isOpen) => set({ isOpen }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'upmake-cart',
    }
  )
)

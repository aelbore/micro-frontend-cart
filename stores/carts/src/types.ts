import { ComputedRef, Ref } from 'vue'

export interface Cart {
  id?: string
  title?: string
  price?: number
  quantity?: number
}

export interface CartState {
  carts?: Cart[]
}

export interface CartGetters {
  carts?: ComputedRef<Cart[]>
}

export interface CartActions {
  addToCart(product: Cart): void
}

export interface CartStore { 
  products?: Ref<Cart[]>
  addToCart: Ref<(product: Cart) => void>
}
import { ComputedRef, Ref } from 'vue'

export interface Product {
  id?: string
  title?: string
  price?: number
}

export interface ProductState {
  products?: Product[]
}

export interface ProductGetters {
  products?: ComputedRef<Product[]>
}

export interface ProductActions {
  addToCart(product: Product): void
}

export interface ProductStore { 
  products?: Ref<Product[]>
  addToCart: Ref<(product: Product) => void>
}
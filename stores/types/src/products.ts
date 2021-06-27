export interface Product {
  id?: string
  title?: string
  price?: number
}

export interface ProductState {
  products?: Product[]
}
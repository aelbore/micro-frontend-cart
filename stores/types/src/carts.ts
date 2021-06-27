export interface Cart {
  id?: string
  title?: string
  price?: number
  quantity?: number
}

export interface CartState {
  carts?: Cart[]
}
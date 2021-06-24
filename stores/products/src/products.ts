import { reactive } from '@vue/reactivity'
import { createStore } from 'koala-store'
import useCart from 'carts-store'

import { Product, ProductState } from './types'

export default createStore({
  id: 'Products',
  state: reactive<ProductState>({
    products: [
      { id: 'p1', title: 'Gaming Mouse', price: 29.99 },
      { id: 'p2', title: 'Harry Potter 3', price: 9.99 },
      { id: 'p3', title: 'Used plastic bottle', price: 0.99 },
      { id: 'p4', title: 'Half-dried plant', price: 2.99 }
    ]
  }),
  actions: {
    addToCart({}, product: Product) {
      const cart = useCart()
      cart.addToCart(product)
    }
  }
})
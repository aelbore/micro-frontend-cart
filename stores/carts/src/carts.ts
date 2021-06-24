import { reactive } from '@vue/reactivity'
import { createStore } from 'koala-store'
import { computed, readonly, ref, toRefs, getCurrentInstance } from 'vue'

import { Cart, CartState } from './types'

const cartState = reactive<CartState>({
  carts: [
    { id: 'p1', title: 'Gaming Mouse', price: 29.99, quantity: 1 }
  ]
}) 

const addToCart = (product: Cart) => {  
  const carts = [ ...cartState.carts ]
  const index = carts.findIndex(cart => cart.id === product.id)
  if (index !== -1) {
    carts[index].quantity++
  } else {
    carts.push({ ...product, quantity: 1 })
  }
  cartState.carts = [ ...carts  ]  
  
  publish('carts', cartState.carts)
}

const removeCart = (product: Cart) => {
  const carts = [ ...cartState.carts ]
  const index = carts.findIndex(cart => cart.id === product.id)
  if (index !== -1) {
    const item = carts[index]
    if (item.quantity === 1) {
      carts.splice(index, 1)
    } else {
      carts[index].quantity--
    }
  }
  cartState.carts = [ ...carts ]  
}

const subscribe = (event: string, callback: (payload: any) => void ) => {
  window.addEventListener(event, (payload: CustomEvent) => {
    callback(payload.detail)
  })
  return window
}

const publish = (event: string, payload: any) => {
  window.dispatchEvent(new CustomEvent(event, { detail: payload }))
}

function useCart() {
  return {
    ...toRefs(cartState),
    addToCart,
    removeCart,
    subscribe
  }
}

export default useCart


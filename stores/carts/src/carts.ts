
import { createStore, Action, useStore as store, Reducer } from 'koala-store'
import { CartState, Cart } from './types'

const CART_KEY = 'Carts'

export class AddToCartAction implements Action {

  readonly type: string = 'addToCart'
  payload: Cart = {}

  constructor(payload?: Cart) {
    this.payload = { ...this.payload, ...payload }
  } 

}

export class RemoveCartAction implements Action {

  readonly type: string = 'removeToCart'
  payload: Cart = {}

  constructor(payload?: Cart) {
    this.payload = { ...this.payload, ...payload }
  } 

}


const reducer: Reducer<CartState> = (
  state: CartState, 
  action?: Action
) => {

  if (!action) return state

  const actions = {
    addToCart() {
      const product = (<AddToCartAction>action).payload

      const carts = [ ...state.carts ]
      const index = carts.findIndex(cart => cart.id === product.id)
      if (index !== -1) {
        carts[index].quantity++
      } else {
        carts.push({ ...product, quantity: 1 })
      }
      state.carts = [ ...carts  ]  

      return state
    },
    removeToCart() {
      const product = (<AddToCartAction>action).payload

      const carts = [ ...state.carts ]
      const index = carts.findIndex(cart => cart.id === product.id)
      if (index !== -1) {
        const item = carts[index]
        if (item.quantity === 1) {
          carts.splice(index, 1)
        } else {
          carts[index].quantity--
        }
      }
      state.carts = [ ...carts ]  
    }
  }

  return actions[action?.type] ? actions[action?.type](): state
}

export function useStore() {
  return store(CART_KEY)
}

export default createStore<CartState>({
  key: CART_KEY,
  state: {
    carts: [
      { id: 'p1', title: 'Gaming Mouse', price: 29.99, quantity: 1 }
    ]
  },
  reducer
})
import { AnyAction, createStore, Reducer } from 'redux'

import { CartState } from './types'

export type Action = AnyAction & { payload?: any }

export interface ComputedGetter<S, T> {
  (state: S): T
}

const removeCart = (state: CartState, action: Action) => {
  const product = action.payload

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

  return state
}

const reducer: Reducer<CartState> = (
  state: CartState, 
  action: Action
) => {
  switch(action.type) {
    case 'addToCart': 
      const product = action.payload

      const carts = [ ...state.carts ]
      const index = carts.findIndex(cart => cart.id === product.id)
      if (index !== -1) {
        carts[index].quantity++
      } else {
        carts.push({ ...product, quantity: 1 })
      }
      state.carts = [ ...carts  ]  

      return state
    case 'removeCart': 
      return removeCart(state, action)
    default:
      return state
  }
}

const store = createStore(reducer, {
  carts: [
    { id: 'p1', title: 'Gaming Mouse', price: 29.99, quantity: 1 }
  ]
})

export default store
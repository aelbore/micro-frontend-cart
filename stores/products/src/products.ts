import { AnyAction, createStore, Reducer } from 'redux'
import * as cart from 'carts-store'
import { koala } from 'koala-store'

export type Action = AnyAction & { payload?: any }

export interface Product {
  id?: string
  title?: string
  price?: number
}

export interface ProductState {
  products?: Product[]
}

const reducer: Reducer<ProductState> = (
  state: ProductState, 
  action: Action
) => {
  const { dispatch } = cart.useStore()

  switch (action.type) {
    case 'addToCart': 
      dispatch({ type: 'addToCart', payload: action.payload })
      return state
    case 'removeCart':
      dispatch({ type: 'removeCart', payload: action.payload })
      return state
    default: 
      return state
  }
}

const store = createStore(reducer, {
  products: [
    { id: 'p1', title: 'Gaming Mouse', price: 29.99 },
    { id: 'p2', title: 'Harry Potter 3', price: 9.99 },
    { id: 'p3', title: 'Used plastic bottle', price: 0.99 },
    { id: 'p4', title: 'Half-dried plant', price: 2.99 }
  ]
})

export function useStore() {
  return koala<ProductState>(store)
}

export default store
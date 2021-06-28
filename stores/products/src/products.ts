import { createStore, Reducer } from 'redux'
import { useStore, Action } from 'koala-store'

import { ProductState, CartState, STORES } from 'types'

const reducer: Reducer<ProductState> = (
  state: ProductState, 
  action: Action
) => {
  const { dispatch } = useStore<CartState>(STORES.CARTS)

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

export default store
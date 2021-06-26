import * as store from 'koala-store'
import { Product, ProductState } from './types'

const reducer: store.Reducer<ProductState> = (
  state: ProductState, 
  action?: AddToCart
)  => {
  if (!action) return state

  const actions = {
    [action?.type]() {
      const { dispatch } = store.useStore('Carts')
      dispatch({ type: 'addToCart', payload: action.payload })

      return state
    }
  }

  return actions[action?.type] ? actions[action?.type](): state
}

export class AddToCart implements store.Action {

  readonly type: string = 'addToCart'
  payload: Product

  constructor(payload: Partial<Product> = {}) {
    this.payload = { ...payload, ...payload }
  }

}

export function useStore() {
  return store.useStore<ProductState>('Products')
}

export default store.createStore({
  key: 'Products',
  state: {
    products: [
      { id: 'p1', title: 'Gaming Mouse', price: 29.99 },
      { id: 'p2', title: 'Harry Potter 3', price: 9.99 },
      { id: 'p3', title: 'Used plastic bottle', price: 0.99 },
      { id: 'p4', title: 'Half-dried plant', price: 2.99 }
    ]
  },
  reducer
})
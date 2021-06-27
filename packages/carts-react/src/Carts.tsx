import React, { useEffect, useState } from 'react'

import Cart from './Cart'

import { useStore } from 'koala-store'
import { STORES, CartState, Cart as ICart } from 'types'

const Carts = (): JSX.Element => {
  const { dispatch, store } = useStore<CartState>(STORES.CARTS)
  const [ carts, setCarts ] = useState<ICart[]>(store.getState().carts)

  const removeCart = (cart: ICart) => {
    dispatch({ type: 'removeCart', payload: cart })
  }

  const listener = store.subscribe(() => {
    const state = store.getState()
    setCarts(state.carts)
  })

  useEffect(() => {
    return () => listener()
  }, [])

  return (
    <main style={{
      width: '50rem',
      maxWidth: '90%',
      margin: '2rem auto'      
    }}>
    { 
      (carts && carts.length) 
        ? (
            <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
              { 
                carts.map((cart, index) => {
                  return <Cart key={index} cart={cart} removeCart={() => removeCart(cart)} />
                }) 
              }
            </ul>
          )
        : (
            <p style={{ textAlign: 'center' }}> 
              No Item in the Cart!
            </p>
          )
      }
      </main>
  )
}

export default Carts
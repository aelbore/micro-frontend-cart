import React from 'react'
import { Cart as ICart } from 'types'

export interface CartProps {
  cart?: ICart
  removeCart?: () => void
}

const Cart = (props: CartProps): JSX.Element => {
  return (
    <li>
      <div style={{
        padding: '1rem',
        margin: '1rem 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #35495e'
      }}>
        <div>
          <strong>{props.cart.title}</strong> - { props.cart.price } ({props.cart.quantity})
        </div>
        <div>
          <button onClick={props.removeCart}>Remove from Cart</button>
        </div>
      </div>
    </li>
  )
}

export default Cart
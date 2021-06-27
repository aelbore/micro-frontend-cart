import React from 'react'

export interface CartProps {
  title?: string
  price?: number
  quantity?: number
}

const Cart: React.FC<CartProps> = (props) => {

  
  return (
    <div style={{
      padding: '1rem',
      margin: '1rem 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>

      <div>
        <strong></strong>
      </div>
      <div>

      </div>

    </div>
  )
}
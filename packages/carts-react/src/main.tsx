import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import {  defineComponent, h, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'

import Carts from './Carts'

export default defineComponent({
  setup(_, context) {
    const el = ref()

    const renderApp = () => 
      render(React.createElement(Carts, context.attrs), el.value)       

    onMounted(() => renderApp())

    onUpdated(() => renderApp())

    onBeforeUnmount(() => {
      unmountComponentAtNode(el.value)
    })
    
    return () => h('div', { ref: el })
  }
})
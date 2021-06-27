import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

import { onBeforeUnmount, onMounted, onUpdated, onUnmounted, defineComponent, h, ref } from 'vue'

import Carts from './Carts'

export default defineComponent({
  setup(_, context) {
    const el = ref()

    const renderApp = () => 
      render(React.createElement(Carts, context.attrs), el.value)       
      
    const unMountApp = () => 
      el.value && unmountComponentAtNode(el.value)

    onMounted(() => renderApp())

    onUpdated(() => renderApp())

    onUnmounted(() => unMountApp())

    onBeforeUnmount(() => unMountApp())
    
    return () => h('div', { ref: el })
  }
})
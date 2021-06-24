import { createApp, defineComponent, h, onMounted, onUpdated, ref } from 'vue'

import Products from './Products.vue'

export default defineComponent({
  setup() {
    const el = ref()

    const renderApp = () => 
      createApp(Products)
        .mount(el.value)        

    onMounted(() => renderApp())

    onUpdated(() => renderApp())
    
    return () => h('div', { ref: el })
  }
})
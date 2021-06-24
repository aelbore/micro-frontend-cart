import { createApp, defineComponent, h, onMounted, onUpdated, ref } from 'vue'

import Carts from './Carts.vue'

export default defineComponent({
  setup() {
    const el = ref()

    const renderApp = () => 
      createApp(Carts)
        .mount(el.value)        

    onMounted(() => renderApp())

    onUpdated(() => renderApp())
    
    return () => h('div', { ref: el })
  }
})
<template>
  <main class="products">
    <ul>
      <li v-for="(product, index) in products" :key="index">
        <Product :product="product" @addToCart="addToCart(product)" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import productStore from 'products-store'

import Product from './Product.vue'

export default defineComponent({
  name: 'Products',
  components: {
    Product
  },
  setup() {
    const { subscribe, getState, dispatch } = productStore
    const products = ref()

    subscribe(() => {
      const state = getState()
      products.value = state.products
    })

    const addToCart = (product) => 
      dispatch({ type: 'addToCart', payload: product })

    onMounted(() => {
      dispatch({ type: 'onInit' })
    })

    return { products, addToCart }
  }
})
</script>

<style lang="scss">
.products {
  width: 50rem;
  max-width: 90%;
  margin: 2rem auto;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
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
import { Product as IProduct, ProductState, STORES } from 'types'
import { defineComponent } from 'vue'
import { useStore } from 'koala-store'

import Product from './Product.vue'

export default defineComponent({
  name: 'Products',
  components: {
    Product
  },
  setup() {
    const { getter, dispatch } = useStore<ProductState>(STORES.PRODUCTS)
    const products = getter((state) => state.products)

    const addToCart = (product: IProduct) => 
      dispatch({ type: 'addToCart', payload: product })

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
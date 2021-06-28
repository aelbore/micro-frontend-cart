<template>
  <main class="carts">
    <p v-if="carts && carts.length <= 0">
      No Item in the Cart!
    </p>
    <ul>
      <li v-for="(product, index) in carts" :key="index">
        <Cart :product="product" @remove="removeCart(product)" />
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { CartState, Cart as ICart, STORES } from 'types'
import { useStore } from 'koala-store'

import Cart from './Cart.vue'

export default {
  name: 'Carts',
  components: {
    Cart
  },
  setup() {
    const { getter, dispatch } = useStore<CartState>(STORES.CARTS)

    const carts = getter((state) => state.carts)

    const removeCart = (product: ICart) => 
      dispatch({ type: 'removeCart', payload: product })

    return { carts, removeCart }
  }
}
</script>

<style lang="scss">
.carts {
  width: 50rem;
  max-width: 90%;
  margin: 2rem auto;

  p {
    text-align: center;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
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

<script>
import cartStore from 'carts-store'
import Cart from './Cart.vue'
import { onMounted, ref } from 'vue'

export default {
  name: 'Carts',
  components: {
    Cart
  },
  setup() {
    const { dispatch, subscribe, getState } = cartStore
    const carts = ref()

    subscribe(() => {
      const state = getState()
      carts.value = state.carts
    })

    const removeCart = (product) => 
      dispatch({ type: 'removeCart', payload: product })

    onMounted(() => {
      dispatch({ type: 'onInit' })
    })

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
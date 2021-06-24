<template>
  <main class="carts">
    <p v-if="carts.length <= 0">
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
import useCart from 'carts-store'
import Cart from './Cart.vue'

export default {
  name: 'Carts',
  components: {
    Cart
  },
  setup() {
    const { carts, removeCart } = useCart()

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
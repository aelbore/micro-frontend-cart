<template>
  <div class="cart">
    <div>
      <strong>{{ product.title }}</strong> - {{ product.price }} ({{ product.quantity }})
    </div>
    <div>
      <button @click="removeFromCart()">Remove from Cart</button>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'

export default {
  name: 'Cart',
  props: [ 'product' ],
  setup(props, { emit }) {
    const removeFromCart = () => emit('remove', props.product) 

    return { ...toRefs(props), removeFromCart }
  }
}
</script>

<style lang="scss">
.cart {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #00179b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
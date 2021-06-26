<template>
  <div class="product">
    <div>
      <strong>{{ product.title }}</strong> - {{ product.price }}
    </div>
    <div>
      <button @click="addToCart()">Add to Cart</button>
    </div>
  </div>
</template>

<script lang="ts">
import { toRefs, defineComponent } from 'vue'

export default defineComponent({
  name: 'Product',
  props: {
    product: {
      type: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    const addToCart = () => emit('addToCart')

    return { ...toRefs(props), addToCart }
  }
})
</script>

<style lang="scss">
.product {
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #35495e;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
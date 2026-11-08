<script setup>
import { ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import CartModal from './components/CartModal.vue'
import AIChatbot from './components/AIChatbot.vue'

// Điều khiển đóng/mở giỏ hàng
const showCart = ref(false)
</script>

<template>
  <AppHeader @open-cart="showCart = true" />
  <main class="container">
    <RouterView />
  </main>
  <CartModal v-if="showCart" @close="showCart = false" />
  <AIChatbot />
</template>

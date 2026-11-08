<script setup>
import { useCartStore } from '../stores/cart' //lấy dữ liệu giỏ hàng

defineEmits(['open-cart']) //mở giỏ hàng
const cart = useCartStore() //truy cập cart store
</script>

<template>
  <header class="header"> <!--gắn CSS cho header-->
    <div class="container header-inner"> <!--khung chứa nội dung header-->
      <RouterLink to="/" class="logo">👗 Fashion Shop</RouterLink> <!--nhấn logo về trang chủ-->
      <button class="btn" @click="$emit('open-cart')"> <!--@click="$emit('open-cart') yêu cầu app.vue mở modal-->
        🛒 Giỏ hàng <span class="badge">{{ cart.totalQty }}</span> <!--nút giỏ hàng-->
      </button>
    </div>
  </header>
</template>

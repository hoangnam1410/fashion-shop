<script setup>
// Icon sản phẩm dạng SVG: màu icon (fill) đổi theo màu khách đang chọn
defineProps({
  category: { type: String, required: true },
  color: { type: String, required: true }, // mã màu hex, ví dụ '#3b82f6'
})

// Mỗi danh mục một hình vẽ đơn giản (viewBox 100x100)
const SHAPES = {
  'Áo': 'M30 15 L10 28 L20 42 L28 37 L28 85 L72 85 L72 37 L80 42 L90 28 L70 15 C65 24 35 24 30 15 Z',
  'Quần': 'M28 12 L72 12 L76 88 L55 88 L50 40 L45 88 L24 88 Z',
  'Váy': 'M38 10 L62 10 L60 32 L72 88 L28 88 L40 32 Z',
  'Giày': 'M8 55 L30 48 L38 58 L60 60 C80 62 92 68 92 76 L92 80 L8 80 Z',
  'Phụ kiện': 'M22 38 L78 38 L84 88 L16 88 Z', // túi
}
const HANDLE = 'M36 38 C36 10 64 10 64 38' // quai túi
</script>

<template>
  <svg class="icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <!-- :fill gắn với prop color -> đổi màu là icon đổi màu ngay -->
    <path :d="SHAPES[category] || SHAPES['Áo']" :fill="color"
          stroke="#222" stroke-width="2" stroke-linejoin="round" />
    <path v-if="category === 'Phụ kiện'" :d="HANDLE" fill="none"
          stroke="#222" stroke-width="4" stroke-linecap="round" />
  </svg>
</template>

<style scoped>
.icon path:first-child { transition: fill 0.2s; }
</style>

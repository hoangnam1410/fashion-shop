<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/products' //lấy hàm quản lí sản phẩm từ pinia store
import ProductCard from '../components/ProductCard.vue' // component hiển thị từng sản phẩm
import { CATEGORIES } from '../data/products' // lấy dữ liệu sản phảm

const store = useProductStore() // khởi tạo và truy cập vào 
const category = ref('Tất cả') //lưu danh mục

// computed: lọc sản phẩm
const filtered = computed(() =>
  category.value === 'Tất cả'
    ? store.list //đúng lấy toàn bộ
    : store.list.filter((p) => p.category === category.value) // sai lọc theo danh mục
)
</script>

<template>
  <h1>Sản phẩm</h1> 
  <!--khu chứa các nút-->
  <div class="filters">
  <!-- tạo nút danh mục-->
    <button
      v-for="c in CATEGORIES" 
      :key="c" 
      class="chip"
      :class="{ active: c === category }"
      @click="category = c"
    >
      {{ c }}
    </button>
  </div>
<!--khu vực lưới chứa sản phẩm-->
  <div class="grid">
    <!--hiển thị sản phẩm--> <!--lặp qua danh sách--> <!--id làm key--> <!--truyền dữ liệu qua p-->
    <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
  </div>
   <!--kiểm tra danh sách-->
  <p v-if="filtered.length === 0" class="muted">Không có sản phẩm nào.</p>
</template>

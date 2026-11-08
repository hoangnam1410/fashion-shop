<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products' // lấy sp vs tk
import { useCartStore } from '../stores/cart' //ql giỏ hàng
import { formatPrice } from '../utils/format' // định dạng tiền
import ProductIcon from '../components/ProductIcon.vue' //hình ảnh

const route = useRoute() // lấy tt d/c hiện tại
const store = useProductStore() //truy cập
const cart = useCartStore() //truy cập

// Lấy sp theo id trên URL
const product = computed(() => store.getProduct(route.params.id))
// lưu màu
const color = ref(product.value?.colors[0].name)
const size = ref(product.value?.sizes[0]) //kích thước
const message = ref('') //lưu tb

// mã màu
const colorHex = computed(
  () => product.value.colors.find((c) => c.name === color.value).hex
)
// Tồn kho của đúng biến thể đang chọn (màu + size)
const stock = computed(() => store.getStock(product.value.id, color.value, size.value))
const inStock = computed(() => stock.value > 0)
const sale = computed(() => product.value.oldPrice > product.value.price)

// watch: đổi màu/size thì xóa thông báo cũ
watch([color, size], () => (message.value = ''))

// watch: khi chuyển sang sản phẩm khác (đổi :id trên URL, ví dụ bấm gợi ý từ chatbot)
// thì đặt lại màu/size mặc định, vì Vue Router dùng lại cùng một component
watch(
  () => route.params.id, //theo dõi id sp
  () => {
    if (!product.value) return //k thấy sp dừng
    color.value = product.value.colors[0].name //đặt lại màu đầu 
    size.value = product.value.sizes[0] //đặt lại size đầu 
  }
)
//thêm sp vào giỏ
function addToCart() {
  const ok = cart.add(product.value, color.value, size.value) //tt ,màu,size sp
  message.value = ok ? '✅ Đã thêm vào giỏ hàng' : '❌ Biến thể này đã hết hàng'
}
</script>

<template>
  <RouterLink to="/" class="back">← Quay lại</RouterLink>
<!--tìm sp hiện giao diện, tạo bc trang -->
  <div v-if="product" class="detail">
    <div class="thumb big">
      <!--hiển thị hình sp, dm sp, mã màu -->
      <ProductIcon :category="product.category" :color="colorHex" />
    </div>

    <div>
      <h1>{{ product.name }}</h1>
      <p class="price big-price">
        {{ formatPrice(product.price) }} <!--hiển thị tiền VN-->
        <small v-if="sale" class="old">{{ formatPrice(product.oldPrice) }}</small> <!--hiện giá cũ nếu có sale-->
      </p>

      <h4>Màu sắc: {{ color }}</h4>
      <div class="swatches">
        <span
          v-for="c in product.colors" 
          :key="c.name"
          class="swatch large"
          :class="{ active: c.name === color }"
          :style="{ background: c.hex }"
          :title="c.name"
          @click="color = c.name"
        ></span>
      </div>

      <h4>Size: {{ size }}</h4>
      <div class="filters">
        <button
          v-for="s in product.sizes"
          :key="s"
          class="chip"
          :class="{ active: s === size, disabled: store.getStock(product.id, color, s) === 0 }"
          @click="size = s"
        >
          {{ s }}
        </button>
      </div>

      <p v-if="inStock" class="in">In stock — còn {{ stock }} sản phẩm</p>
      <p v-else class="out-text">Out of stock — hết hàng</p>

      <button class="btn primary" :disabled="!inStock" @click="addToCart">
        Thêm vào giỏ
      </button>
      <p class="muted">{{ message }}</p>
    </div>
  </div>

  <p v-else>Không tìm thấy sản phẩm.</p>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/products' // dữ liệu sp và tồn kho
import { formatPrice } from '../utils/format' //định dàng tiền
import ProductIcon from './ProductIcon.vue' //hình minh họa sp

const props = defineProps({ product: { type: Object, required: true } }) //khai báo dữ liệu nhận đc từ cha
const store = useProductStore() //khởi tạo 

// Lưu màu đang xem trước
const previewColor = ref(props.product.colors[0])

//kt có đang giảm giá hay k
const sale = computed(() => props.product.oldPrice > props.product.price)
const inStock = computed(() => store.totalStock(props.product) > 0) //tồn kho(tính tổng màu vs size)
const percent = computed(() => 
  Math.round((1 - props.product.price / props.product.oldPrice) * 100) // %giảm vs Math.round làm tròn
)
</script>

<template>
  <div class="card"> <!--chứa thẻ sp-->
    <RouterLink :to="{ name: 'product', params: { id: product.id } }"> <!--tạo link chi tiết sp-->
      <!-- hình ảnh sp -->
      <div class="thumb">
        <ProductIcon :category="product.category" :color="previewColor.hex" /> <!--truyền vào ProductIcon -->
        <span v-if="sale" class="tag sale">-{{ percent }}%</span> <!--hiển thị nhãn giảm khi sp giảm-->
        <span v-if="!inStock" class="tag out">Hết hàng</span> <!--hiển thị hết hàng-->
      </div>
    </RouterLink>
    <!--chứa thông tin sp-->
    <div class="card-body">
      <h3>{{ product.name }}</h3>
      <p class="price"> <!--hiển thị giá-->
        {{ formatPrice(product.price) }} <!--định dạng tiền-->
        <small v-if="sale" class="old">{{ formatPrice(product.oldPrice) }}</small> <!--hiển thị giá cũ-->
      </p>
      <!--ô màu-->
      <div class="swatches">
        <!--lặp qua ds màu -->
        <span
          v-for="c in product.colors"
          :key="c.name"
          class="swatch"
          :class="{ active: c.name === previewColor.name }"
          :style="{ background: c.hex }"
          :title="c.name"
          @mouseover="previewColor = c"
        ></span>
      </div>
      <!--còn hàng thì in hết thì out-->
      <p :class="inStock ? 'in' : 'out-text'">
        {{ inStock ? 'Còn hàng' : 'Out of stock' }}
      </p>
    </div>
  </div>
</template>

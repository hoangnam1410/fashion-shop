<script setup>
import { useCartStore } from '../stores/cart' //ql giỏ hàng
import { formatPrice } from '../utils/format' //định dạng tiền
import ProductIcon from './ProductIcon.vue' //hình ảnh

defineEmits(['close']) // sk close yc component đóng giỏ hàng
const cart = useCartStore() // truy cập dl và cn giỏ
// hàm xử lí thanh toán
function pay() {
  alert('Đặt hàng thành công! Cảm ơn bạn 🎉')
  cart.checkout() // xóa sp khi thanh toán
}
</script>

<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-head">
        <h2>Giỏ hàng ({{ cart.totalQty }})</h2>
        <button class="btn-link" @click="$emit('close')">✕</button> <!--nút đóng giỏ-->
      </div>

      <p v-if="cart.items.length === 0" class="muted">Giỏ hàng đang trống.</p> <!--kt giỏ-->

      <ul v-else class="cart-list"> <!--hiển thị ds-->
        <li v-for="i in cart.items" :key="i.id + i.color + i.size"> <!--lặp qua dssp, pb id, màu, size-->
          <ProductIcon :category="i.category" :color="i.hex" />
          <div class="grow">
            <strong>{{ i.name }}</strong> <!--tên sp-->
            <div class="muted">{{ i.color }} / {{ i.size }} — {{ formatPrice(i.price) }}</div> <!--màu, size, giá-->
          </div>
          <div class="qty"> <!--chỉnh sl-->
            <button @click="cart.decrease(i)">−</button> <!--giảm-->
            <span>{{ i.qty }}</span>
            <button @click="cart.increase(i)">+</button> <!--tăng-->
          </div>
          <button class="btn-link danger" @click="cart.remove(i)">Xóa</button> <!--nút xóa-->
        </li>
      </ul>

      <div v-if="cart.items.length" class="summary"> <!--hiển thị tính tiền khi có sp trong giỏ-->
        <div><span>Tạm tính</span><span>{{ formatPrice(cart.subtotal) }}</span></div> <!--hiện tổng giá trc khi giảm giá-->
        <!--chỉ hiện dòng giảm giá khi có chiết khấu -->
        <div v-if="cart.discount > 0" class="green">
          <span>Giảm 10% (đơn từ 1.000.000đ)</span>
          <span>-{{ formatPrice(cart.discount) }}</span> <!--số tiền đc giảm-->
        </div>
        <div class="total"><span>Tổng cộng</span><span>{{ formatPrice(cart.total) }}</span></div> <!--tiền cần tt-->
        <button class="btn primary full" @click="pay">Thanh toán</button> <!--nút thanh toán-->
      </div>
    </div>
  </div>
</template>

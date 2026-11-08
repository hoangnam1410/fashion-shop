import { defineStore } from 'pinia' 
import { ref, computed } from 'vue'
import { useProductStore } from './products'

// tạo store tên cart
export const useCartStore = defineStore('cart', () => {
  const products = useProductStore() // kết nối store để kt và cập nhập tồn kho

  const items = ref([]) // mỗi item: { id, name, emoji, price, color, size, qty }
 
  const totalQty = computed(() => items.value.reduce((s, i) => s + i.qty, 0)) //tính tổng sl sp trong giỏ
  const subtotal = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0)) //tính tổng trước khi giảm giá
  // tổng tiền >1tr thì giảm 10%
  const discount = computed(() => (subtotal.value >= 1_000_000 ? subtotal.value * 0.1 : 0))
  const total = computed(() => subtotal.value - discount.value) //tiền cần thanh toán

  // Thêm vào giỏ: kiểm tra tồn kho -> trừ kho 1 đơn vị
  function add(product, color, size) {
    if (products.getStock(product.id, color, size) <= 0) return false // tồn kho <= 0 không thêm vào giỏ trả về false
    const found = items.value.find( 
      (i) => i.id === product.id && i.color === color && i.size === size
    ) // kt giỏ có sp hay chưa
    if (found) found.qty++ // có +1 
    else items.value.push({
      id: product.id, name: product.name, category: product.category,
      hex: product.colors.find((c) => c.name === color).hex,
      price: product.price, color, size, qty: 1,
    }) // chưa có thì thêm sp vào với cái thuộc tính
    products.changeStock(product.id, color, size, -1) // trừ tồn kho
    return true
  }

  // Tăng số lượng trong giỏ (nếu còn hàng)
  function increase(item) {
    if (products.getStock(item.id, item.color, item.size) <= 0) return
    item.qty++
    products.changeStock(item.id, item.color, item.size, -1)
  }

  // Giảm số lượng trong giỏ (hoàn 1 vào kho); về 0 thì xóa
  function decrease(item) {
    item.qty--
    products.changeStock(item.id, item.color, item.size, +1)
    if (item.qty === 0) items.value = items.value.filter((i) => i !== item)
  }

  // Xóa sản phẩm: hoàn trả đúng số lượng tồn kho
  function remove(item) {
    products.changeStock(item.id, item.color, item.size, item.qty)
    items.value = items.value.filter((i) => i !== item)
  }

  // Thanh toán: xóa giỏ, KHÔNG hoàn kho (hàng đã bán)
  function checkout() { 
    items.value = []
  } 

  return { items, totalQty, subtotal, discount, total, add, increase, decrease, remove, checkout }
})
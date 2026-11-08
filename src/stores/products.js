import { defineStore } from 'pinia' //tạo store của pinia
import { reactive } from 'vue' // dữ liệu phản ứng khi thay đổi
import { PRODUCTS } from '../data/products' // dssp mẫu

                              //tạo store tên products
export const useProductStore = defineStore('products', () => {
                      // duyệt sp tạo dữ liệu mới
  const list = reactive(PRODUCTS.map((p) => ({ ...p, stock: { ...p.stock } })))

  const keyOf = (color, size) => `${color}|${size}` 
  const getStock = (id, color, size) => getProduct(id)?.stock[keyOf(color, size)] ?? 0
  const totalStock = (p) => Object.values(p.stock).reduce((a, b) => a + b, 0) //sum tồn kho của 1 sp
  const getProduct = (id) => list.find((p) => p.id === Number(id))
  // Action: tăng/giảm tồn kho của 1 biến thể
  function changeStock(id, color, size, delta) {
    getProduct(id).stock[keyOf(color, size)] += delta
  }

  return { list, getProduct, getStock, totalStock, changeStock }
})

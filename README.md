# Fashion Shop — SPA Vue 3 + Pinia + Chatbot AI + CI/CD

## Chạy thử
```bash
npm install
npm run dev        # mở http://localhost:5173
npm run build      # build ra thư mục dist
```
Chatbot chạy được ngay ở chế độ **mock** (trả lời theo từ khóa).
Muốn dùng Gemini thật: copy `.env.example` thành `.env` và điền `VITE_GEMINI_API_KEY`.

## Cấu trúc & ý nghĩa từng file (để thuyết trình)
| File | Vai trò |
|---|---|
| `src/main.js` | Khởi tạo app, gắn Pinia + Router |
| `src/App.vue` | Khung chính: Header, RouterView, CartModal, Chatbot |
| `src/router/index.js` | Vue Router: route `/` và route động `/product/:id` |
| `src/data/products.js` | Dữ liệu mẫu: sản phẩm, màu, size, tồn kho theo biến thể |
| `src/stores/products.js` | Pinia store: danh sách sản phẩm + tồn kho |
| `src/stores/cart.js` | Pinia store: giỏ hàng (state, getters `computed`, actions) |
| `src/views/HomeView.vue` | Trang danh sách + lọc danh mục |
| `src/views/ProductDetail.vue` | Chọn màu/size, kiểm tra In stock/Out of stock, thêm giỏ |
| `src/components/ProductCard.vue` | Thẻ sản phẩm: `@mouseover` đổi màu, badge sale/hết hàng |
| `src/components/CartModal.vue` | Giỏ hàng: tăng/giảm/xóa, tổng tiền, chiết khấu |
| `src/components/AIChatbot.vue` | Khung chat |
| `src/services/ai.js` | Gọi Gemini hoặc mock |
| `.github/workflows/deploy.yml` | CI/CD: build + deploy GitHub Pages |

## Đối chiếu với đề cương báo cáo
- **Chương 2 (lý thuyết):** `ref`, `computed`, `watch`, `<script setup>` (xem `ProductDetail.vue`); Router (`router/index.js`); Pinia (`stores/`).
- **Chương 3 (thiết kế):** cây component Header → ProductCard / CartModal / AIChatbot; `v-for`, `v-if`, `@click`, `@mouseover` (xem `ProductCard.vue`); `computed` cho tổng tiền, `sale`, `inStock`.
- **Chương 4 (CI/CD):** `.github/workflows/deploy.yml`.

## Deploy GitHub Pages
1. Đẩy code lên GitHub (nhánh `main`).
2. Vào **Settings → Pages → Source: GitHub Actions**.
3. Mỗi lần push, Actions tự build và deploy.

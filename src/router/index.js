import { createRouter, createWebHashHistory } from 'vue-router' //tạo bộ điều hướng web, SD kiểu URL có #
import HomeView from '../views/HomeView.vue' //giao diện trang chủ
import ProductDetail from '../views/ProductDetail.vue' //giao diện chi tiết sản phẩm

// xuất bộ router để file khác sử dụng
export default createRouter({
  history: createWebHashHistory(), //cấu hình quản lí đường dẫn
  routes: [ //danh sách
    { path: '/', name: 'home', component: HomeView }, //đg dẫn trang chủ, tên home
    { path: '/product/:id', name: 'product', component: ProductDetail }, // đg dẫn chi tiết, id là tham số động, tên product
    { path: '/:pathMatch(.*)*', redirect: '/' }, // bắt các đg dẫn k khớp, chuyền đg dẫn k hợp lệ về trang chủ
  ],
  scrollBehavior: () => ({ top: 0 }), //cuộn trang khi chuyển giao diện
})

import { createApp } from 'vue' //tạo vue
import { createPinia } from 'pinia' //tạo pinia
import App from './App.vue' //component gốc của web
import router from './router' //hệ thống điều hướng
import './style.css' //CSS chung của web

// Tạo app, gắn Pinia (quản lý state toàn cục) và Router (điều hướng)
createApp(App).use(createPinia()).use(router).mount('#app')

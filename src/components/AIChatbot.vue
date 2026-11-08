<script setup>
import { ref, nextTick } from 'vue'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { askAI } from '../services/ai'

const store = useProductStore()
const cart = useCartStore()

const open = ref(false)
const input = ref('')
const loading = ref(false)
const box = ref(null)
const messages = ref([
  { role: 'bot', text: 'Xin chào! Mình là trợ lý AI 🤖. Bạn cần tư vấn gì?', suggestions: [] },
])

async function send() {
  const q = input.value.trim()
  if (!q || loading.value) return
  messages.value.push({ role: 'user', text: q })
  input.value = ''
  loading.value = true

  const reply = await askAI(q, store.list, cart.items)
  messages.value.push({ role: 'bot', ...reply })
  loading.value = false

  // Cuộn xuống tin nhắn mới nhất
  await nextTick()
  box.value.scrollTop = box.value.scrollHeight
}
</script>

<template>
  <button class="chat-fab" @click="open = !open">💬</button>

  <div v-if="open" class="chat">
    <div class="chat-head">Trợ lý AI</div>

    <div ref="box" class="chat-body">
      <div v-for="(m, i) in messages" :key="i" class="msg" :class="m.role">
        <div class="bubble">{{ m.text }}</div>
        <!-- Sản phẩm AI gợi ý: bấm để sang trang chi tiết -->
        <div v-if="m.suggestions?.length" class="sugg">
          <RouterLink
            v-for="p in m.suggestions"
            :key="p.id"
            :to="{ name: 'product', params: { id: p.id } }"
            @click="open = false"
          >
            {{ p.emoji }} {{ p.name }}
          </RouterLink>
        </div>
      </div>
      <div v-if="loading" class="msg bot"><div class="bubble">Đang trả lời...</div></div>
    </div>

    <form class="chat-input" @submit.prevent="send">
      <input v-model="input" placeholder="Hỏi về sản phẩm, đơn hàng..." />
      <button class="btn primary">Gửi</button>
    </form>
  </div>
</template>

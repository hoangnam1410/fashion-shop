// Dịch vụ AI: có API key -> gọi Gemini thật; không có -> chạy mock (theo từ khóa)
const KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash'

const vnd = (n) => n.toLocaleString('vi-VN') + 'đ'

// Hàm chính: trả về { text, suggestions: [sản phẩm gợi ý] }
export async function askAI(question, products, cartItems) {
  if (KEY) {
    try {
      return await askGemini(question, products, cartItems)
    } catch (e) {
      console.warn('Gemini lỗi, chuyển sang chế độ mock:', e)
    }
  }
  return mockReply(question, products, cartItems)
}

// ===== Gọi Gemini thật qua REST API =====
async function askGemini(question, products, cartItems) {
  const catalog = products
    .map((p) => `- ${p.name} (${p.category}), giá ${vnd(p.price)}, màu: ${p.colors.map((c) => c.name).join('/')}`)
    .join('\n')
  const cart = cartItems.length
    ? cartItems.map((i) => `${i.name} ${i.color}/${i.size} x${i.qty}`).join('; ')
    : 'trống'

  const prompt =
    `Bạn là trợ lý tư vấn của cửa hàng thời trang. Trả lời ngắn gọn, thân thiện bằng tiếng Việt.\n` +
    `Danh sách sản phẩm:\n${catalog}\nGiỏ hàng hiện tại: ${cart}\n\nKhách hỏi: ${question}`

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  })
  if (!res.ok) throw new Error('HTTP ' + res.status)
  const data = await res.json()
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Xin lỗi, mình chưa trả lời được.'
  // Sản phẩm nào được nhắc tên trong câu trả lời thì hiện thành gợi ý
  return { text, suggestions: products.filter((p) => text.includes(p.name)) }
}

// ===== Chế độ mock: trả lời theo từ khóa =====
function mockReply(question, products, cartItems) {
  const q = question.toLowerCase()

  if (/đơn hàng|giỏ|thanh toán/.test(q)) {
    if (!cartItems.length) return { text: 'Giỏ hàng của bạn đang trống. Hãy chọn vài món nhé!', suggestions: [] }
    const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
    const lines = cartItems.map((i) => `• ${i.name} (${i.color}/${i.size}) x${i.qty}`).join('\n')
    return { text: `Giỏ hàng của bạn:\n${lines}\nTạm tính: ${vnd(total)}`, suggestions: [] }
  }

  if (/sale|giảm giá|khuyến mãi/.test(q)) {
    const list = products.filter((p) => p.oldPrice > p.price)
    return { text: 'Các món đang giảm giá nè:', suggestions: list }
  }

  const rules = [
    [/áo/, 'Áo'], [/quần/, 'Quần'], [/váy|đầm/, 'Váy'],
    [/giày|sneaker/, 'Giày'], [/túi|mũ|phụ kiện/, 'Phụ kiện'],
  ]
  for (const [re, cat] of rules) {
    if (re.test(q)) {
      const list = products.filter((p) => p.category === cat)
      return { text: `Mình gợi ý vài món thuộc nhóm "${cat}":`, suggestions: list }
    }
  }

  if (/phối|mặc gì|đi chơi|đi làm/.test(q)) {
    const pick = ['Áo thun basic', 'Quần jeans slim', 'Giày sneaker trắng']
    return {
      text: 'Gợi ý phối đồ năng động: áo thun + quần jeans + giày sneaker trắng.',
      suggestions: products.filter((p) => pick.includes(p.name)),
    }
  }

  return {
    text: 'Mình có thể gợi ý áo, quần, váy, giày, phụ kiện, đồ đang giảm giá, phối đồ, hoặc xem giỏ hàng. Bạn muốn xem gì?',
    suggestions: [],
  }
}

// Hàm định dạng tiền Việt: 199000 -> "199.000đ"
export const formatPrice = (n) => n.toLocaleString('vi-VN') + 'đ'

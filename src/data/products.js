// Dữ liệu sản phẩm mẫu (thay cho API thật để demo đơn giản)
// stock: tồn kho theo từng biến thể, key = "Màu|Size"
export const PRODUCTS = [
  {
    id: 1, name: 'Áo thun basic', category: 'Áo', emoji: '👕',
    price: 199000, oldPrice: 250000,
    colors: [
      { name: 'Trắng', hex: '#f5f5f5' },
      { name: 'Đen', hex: '#222222' },
      { name: 'Xanh', hex: '#3b82f6' },
    ],
    sizes: ['S', 'M', 'L'],
    stock: {
      'Trắng|S': 5, 'Trắng|M': 3, 'Trắng|L': 0,
      'Đen|S': 4, 'Đen|M': 6, 'Đen|L': 2,
      'Xanh|S': 0, 'Xanh|M': 2, 'Xanh|L': 5,
    },
  },
  {
    id: 2, name: 'Áo sơ mi công sở', category: 'Áo', emoji: '👔',
    price: 349000, oldPrice: 349000,
    colors: [
      { name: 'Trắng', hex: '#f5f5f5' },
      { name: 'Xanh', hex: '#60a5fa' },
    ],
    sizes: ['M', 'L', 'XL'],
    stock: {
      'Trắng|M': 4, 'Trắng|L': 4, 'Trắng|XL': 1,
      'Xanh|M': 3, 'Xanh|L': 0, 'Xanh|XL': 2,
    },
  },
  {
    id: 3, name: 'Quần jeans slim', category: 'Quần', emoji: '👖',
    price: 459000, oldPrice: 590000,
    colors: [
      { name: 'Xanh đậm', hex: '#1e3a8a' },
      { name: 'Đen', hex: '#222222' },
    ],
    sizes: ['29', '30', '31', '32'],
    stock: {
      'Xanh đậm|29': 2, 'Xanh đậm|30': 5, 'Xanh đậm|31': 3, 'Xanh đậm|32': 1,
      'Đen|29': 0, 'Đen|30': 4, 'Đen|31': 2, 'Đen|32': 3,
    },
  },
  {
    id: 4, name: 'Váy hoa dáng dài', category: 'Váy', emoji: '👗',
    price: 520000, oldPrice: 520000,
    colors: [
      { name: 'Hồng', hex: '#f9a8d4' },
      { name: 'Vàng', hex: '#fcd34d' },
    ],
    sizes: ['S', 'M', 'L'],
    stock: {
      'Hồng|S': 3, 'Hồng|M': 2, 'Hồng|L': 1,
      'Vàng|S': 0, 'Vàng|M': 0, 'Vàng|L': 0,   // hết hàng toàn bộ
    },
  },
  {
    id: 5, name: 'Giày sneaker trắng', category: 'Giày', emoji: '👟',
    price: 690000, oldPrice: 850000,
    colors: [
      { name: 'Trắng', hex: '#f5f5f5' },
      { name: 'Đen', hex: '#222222' },
    ],
    sizes: ['39', '40', '41', '42'],
    stock: {
      'Trắng|39': 2, 'Trắng|40': 3, 'Trắng|41': 4, 'Trắng|42': 1,
      'Đen|39': 1, 'Đen|40': 0, 'Đen|41': 2, 'Đen|42': 2,
    },
  },
  {
    id: 6, name: 'Mũ lưỡi trai', category: 'Phụ kiện', emoji: '🧢',
    price: 129000, oldPrice: 129000,
    colors: [
      { name: 'Đen', hex: '#222222' },
      { name: 'Be', hex: '#d6c3a1' },
    ],
    sizes: ['Free'],
    stock: { 'Đen|Free': 10, 'Be|Free': 6 },
  },
  {
    id: 7, name: 'Túi tote vải', category: 'Phụ kiện', emoji: '👜',
    price: 159000, oldPrice: 199000,
    colors: [
      { name: 'Be', hex: '#d6c3a1' },
      { name: 'Xanh', hex: '#3b82f6' },
    ],
    sizes: ['Free'],
    stock: { 'Be|Free': 7, 'Xanh|Free': 0 },
  },
]

export const CATEGORIES = ['Tất cả', 'Áo', 'Quần', 'Váy', 'Giày', 'Phụ kiện']

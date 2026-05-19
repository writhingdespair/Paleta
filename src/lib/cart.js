export const SINGLE_PRICE = 4
export const PAIR_PRICE = 6

export function priceCart(cart) {
  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const pairs = Math.floor(count / 2)
  const singles = count % 2
  const subtotal = count * SINGLE_PRICE
  const total = pairs * PAIR_PRICE + singles * SINGLE_PRICE
  const savings = subtotal - total
  return { count, subtotal, total, savings, pairs, singles }
}

export const fmt = (n) => `$${n.toFixed(2)}`

export function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

export function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`
}

export function generateOrderNumber() {
  const id = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `ELY-${id}`
}

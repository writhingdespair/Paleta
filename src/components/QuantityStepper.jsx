import Minus from 'lucide-react/dist/esm/icons/minus.js'
import Plus from 'lucide-react/dist/esm/icons/plus.js'

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md' }) {
  const sizes =
    size === 'sm'
      ? { h: 'h-8', btn: 'h-8 w-8', text: 'text-sm', icon: 'h-3 w-3' }
      : { h: 'h-11', btn: 'h-11 w-11', text: 'text-base', icon: 'h-3.5 w-3.5' }
  return (
    <div
      className={`inline-flex ${sizes.h} items-center rounded-full border border-ink/15 bg-paper`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease"
        className={`${sizes.btn} inline-flex items-center justify-center rounded-full text-umber transition-[background-color,color] duration-300 hover:bg-ink/5 hover:text-ink disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-umber`}
      >
        <Minus className={sizes.icon} strokeWidth={2} />
      </button>
      <span
        className={`${sizes.text} font-medium tabular-nums text-ink w-7 text-center`}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase"
        className={`${sizes.btn} inline-flex items-center justify-center rounded-full text-umber transition-[background-color,color] duration-300 hover:bg-ink/5 hover:text-ink disabled:opacity-40`}
      >
        <Plus className={sizes.icon} strokeWidth={2} />
      </button>
    </div>
  )
}

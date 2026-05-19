import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.js'
import MapPin from 'lucide-react/dist/esm/icons/map-pin.js'
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag.js'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2.js'
import X from 'lucide-react/dist/esm/icons/x.js'

import { useLang } from '../lang.js'
import { useEscapeKey, useLockBodyScroll } from '../lib/hooks.js'
import { SINGLE_PRICE, fmt, priceCart } from '../lib/cart.js'
import QuantityStepper from './QuantityStepper.jsx'

function CartLineItem({ item, onUpdate, onRemove }) {
  const { t } = useLang()
  return (
    <div className="flex items-start gap-4 py-4">
      <div
        className={`relative h-16 w-12 sm:h-20 sm:w-14 rounded-xl overflow-hidden border border-ink/10 ${item.flavor.cardBg} shrink-0`}
      >
        <div
          className={`absolute inset-x-0 -top-1 h-12 bg-gradient-to-b ${item.flavor.wash}`}
        />
        <div
          className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ${item.flavor.dot}`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display text-lg leading-tight tracking-tight text-ink truncate">
          {item.flavor.name}
        </div>
        <div className={`mt-0.5 text-xs ${item.flavor.accent}`}>
          {item.flavor.english}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <QuantityStepper
            value={item.qty}
            onChange={(next) => onUpdate(item.id, next)}
            size="sm"
            min={0}
          />
          <div className="text-sm font-medium tabular-nums text-ink">
            {fmt(item.qty * SINGLE_PRICE)}
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        aria-label={t.cart.remove}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-taupe transition-[color,background-color] duration-300 hover:bg-ink/5 hover:text-ink"
      >
        <Trash2 className="h-4 w-4" strokeWidth={1.6} />
      </button>
    </div>
  )
}

export default function CartDrawer({ open, onClose, items, onUpdate, onRemove, onCheckout, onSeeMenu }) {
  const { t } = useLang()
  const pricing = priceCart(items)

  useEscapeKey(onClose, open)
  useLockBodyScroll(open)

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[55] bg-ink/30 backdrop-blur-[3px] transition-opacity duration-500 ease-fluid ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-label={t.cart.title}
        aria-modal="true"
        className={`fixed inset-y-0 right-0 z-[56] w-full sm:max-w-[440px] bg-cream border-l border-ink/10 shadow-[-30px_0_60px_-20px_rgba(26,22,16,0.25)] transition-transform duration-500 ease-fluid flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink/[0.07]">
          <div>
            <div className="font-display text-2xl tracking-tightest text-ink leading-tight">
              {t.cart.title}
            </div>
            {pricing.count > 0 && (
              <div className="text-xs text-taupe mt-0.5">
                {pricing.count}{' '}
                {pricing.count === 1 ? t.cart.itemSingular : t.cart.itemPlural}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label={t.cart.close}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-[background-color,color,transform] duration-500 ease-fluid hover:bg-ink hover:text-paper hover:rotate-90"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {pricing.count === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-paper border border-ink/[0.07] text-taupe">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div className="mt-5 font-display text-xl tracking-tight text-ink">
              {t.cart.empty}
            </div>
            <p className="mt-2 text-sm text-taupe max-w-[18rem]">
              {t.cart.emptyHint}
            </p>
            <button
              onClick={() => {
                onClose()
                onSeeMenu()
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-[transform,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:bg-[#23200E]"
            >
              {t.cart.seeMenu}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 divide-y divide-ink/[0.06]">
              {items.map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  onUpdate={onUpdate}
                  onRemove={onRemove}
                />
              ))}
              <div className="py-4 text-xs text-taupe inline-flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" strokeWidth={1.6} />
                <span>{t.cart.pickupNote}</span>
              </div>
            </div>

            <div className="border-t border-ink/[0.07] bg-paper/60 px-6 py-5">
              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-umber">
                  <dt>{t.cart.subtotal}</dt>
                  <dd className="tabular-nums">{fmt(pricing.subtotal)}</dd>
                </div>
                {pricing.savings > 0 && (
                  <div className="flex items-center justify-between text-emerald-700">
                    <dt>{t.cart.deal}</dt>
                    <dd className="tabular-nums">−{fmt(pricing.savings)}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-ink/[0.07] text-ink">
                  <dt className="font-display text-lg tracking-tight">
                    {t.cart.total}
                  </dt>
                  <dd className="font-display text-2xl tracking-tightest tabular-nums">
                    {fmt(pricing.total)}
                  </dd>
                </div>
              </dl>

              <button
                onClick={onCheckout}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-paper transition-[transform,box-shadow,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#23200E]"
              >
                {t.cart.checkout} · {fmt(pricing.total)}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

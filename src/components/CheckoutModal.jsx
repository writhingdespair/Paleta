import { useEffect, useState } from 'react'
import CheckCircle2 from 'lucide-react/dist/esm/icons/check-circle-2.js'
import Loader2 from 'lucide-react/dist/esm/icons/loader-2.js'
import X from 'lucide-react/dist/esm/icons/x.js'

import { useLang } from '../lang.js'
import { useEscapeKey, useLockBodyScroll } from '../lib/hooks.js'
import {
  SINGLE_PRICE,
  fmt,
  formatCardNumber,
  formatExpiry,
  generateOrderNumber,
  priceCart,
} from '../lib/cart.js'

export default function CheckoutModal({ open, onClose, items, onComplete }) {
  const { t } = useLang()
  const pricing = priceCart(items)
  const [stage, setStage] = useState('form')
  const [form, setForm] = useState({ name: '', number: '', expiry: '', cvc: '' })
  const [orderNumber, setOrderNumber] = useState('')

  useEscapeKey(() => {
    if (stage !== 'processing') onClose()
  }, open)
  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) {
      setStage('form')
      setForm({ name: '', number: '', expiry: '', cvc: '' })
    }
  }, [open])

  useEffect(() => {
    if (stage !== 'processing') return
    const id = setTimeout(() => {
      setOrderNumber(generateOrderNumber())
      setStage('success')
    }, 1600)
    return () => clearTimeout(id)
  }, [stage])

  if (!open) return null

  const fillDemo = () => {
    setForm({
      name: 'Demo · Elyra',
      number: formatCardNumber('4242424242424242'),
      expiry: formatExpiry('1228'),
      cvc: '123',
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStage('processing')
  }

  const formValid =
    form.name.trim().length > 1 &&
    form.number.replace(/\s/g, '').length >= 12 &&
    form.expiry.replace(/\D/g, '').length >= 3 &&
    form.cvc.length >= 3

  const handleDone = () => {
    onComplete()
  }

  return (
    <div
      className="fixed inset-0 z-[58] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={t.checkout.title}
      onClick={() => {
        if (stage !== 'processing') onClose()
      }}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg bg-cream sm:rounded-3xl rounded-t-3xl border border-ink/[0.06] shadow-[0_40px_80px_-20px_rgba(26,22,16,0.45)] overflow-hidden animate-scale-in flex flex-col max-h-[92vh]"
      >
        <div className="flex items-center justify-between px-6 sm:px-7 py-4 border-b border-ink/[0.07]">
          <div className="inline-flex items-center gap-2.5">
            <div className="font-display text-xl tracking-tight text-ink">
              {t.checkout.title}
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
              {t.checkout.demoLabel}
            </span>
          </div>
          {stage !== 'processing' && (
            <button
              onClick={onClose}
              aria-label={t.modal.close}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink transition-[background-color,color,transform] duration-500 ease-fluid hover:bg-ink hover:text-paper hover:rotate-90"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {stage === 'form' && (
          <div className="flex-1 overflow-y-auto px-6 sm:px-7 py-5 sm:py-6">
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-xs text-amber-900 leading-relaxed">
              {t.checkout.demoNote}
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
                {t.checkout.summary}
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 text-umber"
                  >
                    <span className="inline-flex items-center gap-2.5 min-w-0">
                      <span
                        className={`inline-block h-2 w-2 rounded-full ${item.flavor.dot}`}
                      />
                      <span className="truncate text-ink">
                        {item.flavor.name}
                      </span>
                      <span className="text-taupe">× {item.qty}</span>
                    </span>
                    <span className="tabular-nums">
                      {fmt(item.qty * SINGLE_PRICE)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 pt-4 border-t border-ink/[0.07] space-y-1.5 text-sm">
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
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-ink/[0.07] text-ink">
                  <dt className="font-medium">{t.cart.total}</dt>
                  <dd className="font-display text-xl tracking-tightest tabular-nums">
                    {fmt(pricing.total)}
                  </dd>
                </div>
              </dl>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
                  {t.checkout.payment}
                </h4>
                <button
                  type="button"
                  onClick={fillDemo}
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-700 hover:text-rose-800 transition-colors duration-300"
                >
                  {t.checkout.useDemoCard}
                </button>
              </div>

              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-taupe">
                  {t.checkout.cardName}
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, name: e.target.value }))
                  }
                  placeholder={t.checkout.cardNamePlaceholder}
                  className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-taupe/60 focus:outline-none focus:border-ink/40 transition-colors duration-300"
                  autoComplete="cc-name"
                />
              </label>

              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-taupe">
                  {t.checkout.cardNumber}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={form.number}
                  onChange={(e) =>
                    setForm((s) => ({
                      ...s,
                      number: formatCardNumber(e.target.value),
                    }))
                  }
                  placeholder="4242 4242 4242 4242"
                  className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-sm text-ink tabular-nums tracking-wider placeholder:text-taupe/60 focus:outline-none focus:border-ink/40 transition-colors duration-300"
                  autoComplete="cc-number"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-taupe">
                    {t.checkout.cardExpiry}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.expiry}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        expiry: formatExpiry(e.target.value),
                      }))
                    }
                    placeholder="MM / YY"
                    className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-sm text-ink tabular-nums placeholder:text-taupe/60 focus:outline-none focus:border-ink/40 transition-colors duration-300"
                    autoComplete="cc-exp"
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-taupe">
                    {t.checkout.cardCvc}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={form.cvc}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        cvc: e.target.value.replace(/\D/g, '').slice(0, 4),
                      }))
                    }
                    placeholder="123"
                    className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-2.5 text-sm text-ink tabular-nums placeholder:text-taupe/60 focus:outline-none focus:border-ink/40 transition-colors duration-300"
                    autoComplete="cc-csc"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={!formValid}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-paper transition-[transform,box-shadow,background-color,opacity] duration-500 ease-fluid hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#23200E] disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {t.checkout.pay} · {fmt(pricing.total)}
              </button>
            </form>
          </div>
        )}

        {stage === 'processing' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
            <Loader2 className="h-7 w-7 text-ink animate-spin" strokeWidth={1.5} />
            <div className="mt-5 font-display text-xl tracking-tight text-ink">
              {t.checkout.processing}
            </div>
          </div>
        )}

        {stage === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 sm:py-16 text-center">
            <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300/60">
              <CheckCircle2 className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div className="mt-6 font-display text-3xl sm:text-4xl tracking-tightest text-ink leading-tight">
              {t.checkout.successTitle}
            </div>
            <p className="mt-3 text-sm text-umber max-w-sm">
              {t.checkout.successNote}
            </p>
            <div className="mt-6 rounded-2xl border border-ink/[0.07] bg-paper/70 px-5 py-3 text-sm">
              <span className="text-taupe uppercase tracking-[0.18em] text-[11px]">
                {t.checkout.orderNumberLabel}
              </span>
              <span className="ml-2 font-display tabular-nums text-ink">
                #{orderNumber}
              </span>
            </div>
            <button
              onClick={handleDone}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-medium text-paper transition-[transform,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:bg-[#23200E]"
            >
              {t.checkout.done}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

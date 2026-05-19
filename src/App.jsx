import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  CreditCard,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Music2,
  Navigation,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react'

const flavors = [
  {
    id: 'fresas',
    name: 'Fresas con Crema',
    english: 'Strawberry Cream',
    tagline: 'Strawberries and cream. Real ones.',
    description:
      'Real strawberries, sweet cream, a little condensed milk. We hand-cut the strawberries so you actually bite into them.',
    calories: 200,
    ingredients: [
      'Strawberries',
      'Sweetened Condensed Milk',
      'Heavy Cream',
      'Mexican Crema',
      'Whole Milk',
      'Vanilla',
    ],
    accent: 'text-rose-300',
    chip: 'bg-rose-500/15 text-rose-200 border border-rose-400/20',
    cardGlow: 'from-rose-500/25 via-rose-500/10 to-transparent',
    cardHover: 'hover:border-rose-400/40',
    dot: 'bg-rose-400',
    headerGlow: 'from-rose-500/40 via-rose-500/10 to-transparent',
  },
  {
    id: 'mango',
    name: 'Mango con Crema',
    english: 'Mango Cream',
    tagline: "Mango and cream. That's it.",
    description:
      'Ripe mango blended into sweet cream. Smooth, bright, cold.',
    calories: 190,
    ingredients: [
      'Mango',
      'Sweetened Condensed Milk',
      'Heavy Cream',
      'Mexican Crema',
      'Whole Milk',
    ],
    accent: 'text-amber-300',
    chip: 'bg-amber-500/15 text-amber-200 border border-amber-400/20',
    cardGlow: 'from-amber-500/25 via-amber-500/10 to-transparent',
    cardHover: 'hover:border-amber-400/40',
    dot: 'bg-amber-400',
    headerGlow: 'from-amber-500/40 via-amber-500/10 to-transparent',
  },
  {
    id: 'coco',
    name: 'Coco Loco',
    english: 'Coconut Cream',
    tagline: 'Coconut cream, loaded with toasted coconut.',
    description:
      'Thick coconut cream loaded with toasted shredded coconut. Heavy bar, lots of texture.',
    calories: 240,
    ingredients: [
      'Coconut Milk',
      'Sweetened Condensed Milk',
      'Heavy Cream',
      'Toasted Shredded Coconut',
    ],
    accent: 'text-stone-200',
    chip: 'bg-stone-400/15 text-stone-200 border border-stone-300/20',
    cardGlow: 'from-stone-300/25 via-stone-300/8 to-transparent',
    cardHover: 'hover:border-stone-300/40',
    dot: 'bg-stone-200',
    headerGlow: 'from-stone-300/35 via-stone-300/10 to-transparent',
  },
  {
    id: 'horchata',
    name: 'Horchata Classic',
    english: 'Cinnamon & Rice Milk',
    tagline: 'Rice milk, cinnamon. The way it should be.',
    description:
      'Rice milk, cinnamon, condensed milk — the classic, frozen into a thick bar.',
    calories: 180,
    ingredients: [
      'Rice Milk',
      'Whole Milk',
      'Sweetened Condensed Milk',
      'Vanilla',
      'Ceylon Cinnamon',
    ],
    accent: 'text-orange-300',
    chip: 'bg-orange-500/15 text-orange-200 border border-orange-400/20',
    cardGlow: 'from-orange-500/25 via-orange-500/10 to-transparent',
    cardHover: 'hover:border-orange-400/40',
    dot: 'bg-orange-400',
    headerGlow: 'from-orange-500/40 via-orange-500/10 to-transparent',
  },
]

const pillars = [
  {
    icon: Sparkles,
    title: 'Thick, Not Watery',
    body: "Heavy cream and condensed milk. That's why our bars bite like fudge, not like ice.",
  },
  {
    icon: ShieldCheck,
    title: 'Real Fruit, Not Syrup',
    body: "We cut the fruit by hand and drop it straight into the molds. You'll find pieces.",
  },
  {
    icon: Sparkles,
    title: 'Like Abuelita Made It',
    body: "Old recipes, made by hand. No shortcuts, no fillers — the way it's done at home.",
  },
]

const LOCATION = {
  street: '3448 US-9W',
  city: 'Highland, NY 12528',
  hoursShort: '11 AM – 7 PM',
  hoursLong: 'Open every day · 11 AM – 7 PM',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=3448+US-9W+Highland+NY+12528',
}

function useEscapeKey(handler, enabled) {
  useEffect(() => {
    if (!enabled) return
    const onKey = (e) => {
      if (e.key === 'Escape') handler()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handler, enabled])
}

function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}

function NavBar({ onFindUs }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#menu', label: 'Menu' },
    { href: '#location', label: 'Find Us' },
    { href: '#philosophy', label: 'Our Philosophy' },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-canvas/70 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <span className="font-display text-2xl font-600 tracking-tightest text-white">
            Elyra
          </span>
          <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-rose-400 group-hover:bg-rose-300 transition-all duration-300" />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 hover:text-white transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onFindUs}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-sm hover:shadow-[0_0_0_4px_rgba(255,255,255,0.08)] hover:bg-slate-100 transition-all duration-300"
          >
            <Navigation className="h-4 w-4" strokeWidth={1.75} />
            Find Us
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 hover:bg-white/5 transition-all duration-300"
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-canvas/90 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/5 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                onFindUs()
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink"
            >
              <Navigation className="h-4 w-4" /> Find Us
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ onExploreMenu, onFindUs }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-48 pb-24 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-[#08080C] to-canvas" />
        <div className="absolute -top-40 right-[-12%] h-[36rem] w-[36rem] rounded-full bg-rose-600/20 blur-[120px]" />
        <div className="absolute top-40 left-[-12%] h-[28rem] w-[28rem] rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[24rem] w-[60rem] rounded-full bg-orange-500/10 blur-[140px]" />
        <div className="absolute inset-0 grain opacity-40" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-8 lg:gap-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-300 animate-subtle-rise">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Highland, NY · Open every day · 11–7
          </span>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.02] tracking-tightest text-white text-balance max-w-5xl animate-subtle-rise"
            style={{ animationDelay: '60ms' }}
          >
            Mexican Paletas.
            <br className="hidden sm:block" />{' '}
            <span className="text-slate-500">This Summer.</span>
          </h1>

          <p
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-400 text-pretty animate-subtle-rise"
            style={{ animationDelay: '120ms' }}
          >
            Real fruit. Real cream. No stabilizers, no shortcuts.
          </p>

          <div
            className="flex flex-wrap items-center gap-4 animate-subtle-rise"
            style={{ animationDelay: '180ms' }}
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-white text-ink pl-5 pr-2 py-2 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_60px_-30px_rgba(255,255,255,0.25)]">
              <span className="text-sm font-semibold tracking-wide">$4 Single</span>
              <span className="h-5 w-px bg-ink/15" />
              <span className="text-sm font-semibold tracking-wide">2 for $6</span>
              <span className="ml-1 inline-flex items-center justify-center rounded-full bg-ink/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-ink/70">
                Today
              </span>
            </span>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 animate-subtle-rise"
            style={{ animationDelay: '240ms' }}
          >
            <button
              onClick={onExploreMenu}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-ink shadow-sm hover:shadow-[0_0_0_4px_rgba(255,255,255,0.08)] hover:bg-slate-100 transition-all duration-300"
            >
              See the Menu
              <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={onFindUs}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur px-7 py-3.5 text-sm font-medium text-slate-100 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.8} />
              Find Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlavorCard({ flavor, onOpen }) {
  return (
    <button
      onClick={() => onOpen(flavor)}
      className={`group relative flex flex-col text-left rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-8 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] hover:-translate-y-1 hover:shadow-xl hover:bg-white/[0.04] ${flavor.cardHover} transition-all duration-300 overflow-hidden h-full`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 -top-10 h-48 bg-gradient-to-b ${flavor.cardGlow} opacity-90`}
      />
      <div className="pointer-events-none absolute inset-0 grain opacity-30" />

      <div className="relative flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full ${flavor.chip} px-3 py-1 text-[11px] font-medium tracking-wide uppercase backdrop-blur`}
        >
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          Cream Base
        </span>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-slate-300 group-hover:bg-white group-hover:text-ink group-hover:border-white transition-all duration-300"
          aria-hidden
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="relative mt-16 sm:mt-20">
        <h3 className="font-display text-2xl sm:text-[1.75rem] leading-tight tracking-tight text-white">
          {flavor.name}
        </h3>
        <p className={`mt-1 text-sm font-medium ${flavor.accent}`}>{flavor.english}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">{flavor.tagline}</p>
      </div>

      <div className="relative mt-auto pt-8 flex items-center justify-between text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-1 w-1 rounded-full ${flavor.dot}`} />
          {flavor.calories} kcal · per bar
        </span>
        <span className="font-medium text-white">View Details</span>
      </div>
    </button>
  )
}

function MenuSection({ onOpenFlavor }) {
  return (
    <section id="menu" className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              The Menu
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-white text-balance">
              Four flavors.
              <br className="hidden sm:block" /> <span className="text-slate-500">Made this morning.</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed">
            Tap a flavor for the full ingredient list. Every bar is made and frozen the day we sell it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {flavors.map((flavor) => (
            <FlavorCard key={flavor.id} flavor={flavor} onOpen={onOpenFlavor} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlavorModal({ flavor, onClose }) {
  useEscapeKey(onClose, !!flavor)
  useLockBodyScroll(!!flavor)

  if (!flavor) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flavor-modal-title"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl bg-elevated sm:rounded-3xl rounded-t-3xl shadow-2xl border border-white/10 overflow-hidden animate-scale-in"
      >
        <div className="relative h-32 sm:h-40 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${flavor.headerGlow}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-elevated" />
          <div className="absolute inset-0 grain opacity-50" />
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur border border-white/15 text-white hover:bg-white hover:text-ink shadow-sm transition-all duration-300"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full ${flavor.chip} px-3 py-1 text-[11px] font-medium tracking-wide uppercase backdrop-blur`}
            >
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Cream Base
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-7 sm:py-9 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                id="flavor-modal-title"
                className="font-display text-3xl sm:text-4xl tracking-tightest text-white leading-tight"
              >
                {flavor.name}
              </h3>
              <p className={`mt-1 text-sm font-medium ${flavor.accent}`}>{flavor.english}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display text-3xl tracking-tightest text-white">
                {flavor.calories}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mt-0.5">
                kcal / bar
              </div>
            </div>
          </div>

          <p className="mt-5 text-slate-300 leading-relaxed">{flavor.description}</p>

          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Ingredients
            </h4>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {flavor.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-start gap-3 text-sm text-slate-200"
                >
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${flavor.dot}`} />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 flex items-center gap-4">
            <ShieldCheck className="h-5 w-5 text-slate-400 shrink-0" strokeWidth={1.6} />
            <p className="text-xs text-slate-400 leading-relaxed">
              No artificial stabilizers, emulsifiers, or colors. Contains dairy. May contain tree nuts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LocationSection() {
  return (
    <section id="location" className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              Find Us
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-white text-balance">
              On 9W.
              <span className="text-slate-500"> Every day.</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-400 leading-relaxed">
            Same spot all summer in Highland, NY. Pull over, grab a bar, keep going.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl border border-white/10 bg-surface p-7 sm:p-10 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] relative overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                The Stand
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 text-emerald-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border border-emerald-400/20">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-pulse-dot" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open Now
              </span>
            </div>

            <div className="relative mt-8">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                Open for the Summer
              </div>
              <div className="mt-3 flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 text-white shrink-0">
                  <MapPin className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-display text-3xl sm:text-[2rem] leading-tight tracking-tight text-white">
                    {LOCATION.street}
                  </p>
                  <p className="mt-1 text-slate-400">{LOCATION.city}</p>
                </div>
              </div>
            </div>

            <div className="relative mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={LOCATION.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink hover:bg-slate-100 hover:shadow-[0_0_0_4px_rgba(255,255,255,0.08)] transition-all duration-300"
              >
                <Navigation className="h-4 w-4" strokeWidth={1.8} />
                Open in Maps
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-all duration-300" />
              </a>
              <a
                href={`https://www.google.com/maps/place/${encodeURIComponent(
                  `${LOCATION.street}, ${LOCATION.city}`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-slate-100 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
              >
                Copy Address
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-surface p-7 sm:p-10 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Hours
            </span>

            <div className="mt-6 flex items-start gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 text-white shrink-0">
                <Clock className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-display text-3xl sm:text-[2rem] leading-tight tracking-tight text-white">
                  11 AM – 7 PM
                </p>
                <p className="mt-1 text-slate-400 inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-500" strokeWidth={1.8} />
                  Open every day
                </p>
              </div>
            </div>

            <div className="mt-auto pt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 inline-flex items-center gap-1.5">
                  <CreditCard className="h-3 w-3" strokeWidth={1.8} />
                  Card
                </div>
                <div className="mt-1.5 font-medium text-white">Tap & Apple Pay</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 inline-flex items-center gap-1.5">
                  <Wallet className="h-3 w-3" strokeWidth={1.8} />
                  Cash
                </div>
                <div className="mt-1.5 font-medium text-white">Always welcome</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Our Philosophy
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-white text-balance">
            How we make them.
          </h2>
          <p className="mt-6 text-slate-400 leading-relaxed max-w-2xl">
            From the cream we buy to the way we freeze the bars, we keep it simple. Real fruit. Real cream. Made by hand. Sold the same day.
          </p>
        </div>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group flex flex-col rounded-3xl border border-white/10 bg-surface p-8 hover:-translate-y-1 hover:shadow-xl hover:border-white/20 transition-all duration-300 h-full"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-white border border-white/10 group-hover:bg-white group-hover:text-ink group-hover:border-white transition-all duration-300">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-7 font-display text-2xl tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-slate-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="font-display text-4xl sm:text-5xl tracking-tightest">Elyra</div>
            <p className="mt-3 text-white/60 text-sm tracking-wide">Cold bars on 9W.</p>
            <p className="mt-1 text-white/40 text-sm">
              {LOCATION.street}, {LOCATION.city} · {LOCATION.hoursShort}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium hover:bg-white hover:text-ink transition-all duration-300"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.6} />
              @elyra.paletas
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-all duration-300" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium hover:bg-white hover:text-ink transition-all duration-300"
            >
              <Music2 className="h-4 w-4" strokeWidth={1.6} />
              @elyra
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-all duration-300" />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Elyra Paletas. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#menu" className="hover:text-white transition-all duration-300">Menu</a>
            <a href="#location" className="hover:text-white transition-all duration-300">Find Us</a>
            <a href="#philosophy" className="hover:text-white transition-all duration-300">Philosophy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [activeFlavor, setActiveFlavor] = useState(null)
  const locationRef = useRef(null)
  const menuRef = useRef(null)

  const scrollToLocation = () => {
    const el = document.getElementById('location')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-canvas text-white antialiased">
      <NavBar onFindUs={scrollToLocation} />
      <main>
        <Hero onExploreMenu={scrollToMenu} onFindUs={scrollToLocation} />
        <div ref={menuRef}>
          <MenuSection onOpenFlavor={setActiveFlavor} />
        </div>
        <div ref={locationRef}>
          <LocationSection />
        </div>
        <PhilosophySection />
      </main>
      <Footer />
      <FlavorModal flavor={activeFlavor} onClose={() => setActiveFlavor(null)} />
    </div>
  )
}

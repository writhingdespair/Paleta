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
    accent: 'text-rose-700',
    dot: 'bg-rose-500',
    wash: 'from-rose-200/70 via-rose-100/30 to-transparent',
    cardBg: 'bg-[#FBEEEA]',
    cardHover: 'hover:border-rose-300/80',
    modalWash: 'from-rose-300/70 via-rose-200/30 to-transparent',
  },
  {
    id: 'mango',
    name: 'Mango con Crema',
    english: 'Mango Cream',
    tagline: "Mango and cream. That's it.",
    description: 'Ripe mango blended into sweet cream. Smooth, bright, cold.',
    calories: 190,
    ingredients: [
      'Mango',
      'Sweetened Condensed Milk',
      'Heavy Cream',
      'Mexican Crema',
      'Whole Milk',
    ],
    accent: 'text-amber-800',
    dot: 'bg-amber-500',
    wash: 'from-amber-200/70 via-amber-100/30 to-transparent',
    cardBg: 'bg-[#FBF1DC]',
    cardHover: 'hover:border-amber-300/80',
    modalWash: 'from-amber-300/70 via-amber-200/30 to-transparent',
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
    accent: 'text-stone-700',
    dot: 'bg-stone-500',
    wash: 'from-stone-200/70 via-stone-100/30 to-transparent',
    cardBg: 'bg-[#F5EFE2]',
    cardHover: 'hover:border-stone-300/80',
    modalWash: 'from-stone-300/70 via-stone-200/30 to-transparent',
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
    accent: 'text-orange-800',
    dot: 'bg-orange-500',
    wash: 'from-orange-200/70 via-orange-100/30 to-transparent',
    cardBg: 'bg-[#FBEEDC]',
    cardHover: 'hover:border-orange-300/80',
    modalWash: 'from-orange-300/70 via-orange-200/30 to-transparent',
  },
]

const pillars = [
  {
    number: '01',
    title: 'Thick, Not Watery',
    body: "Heavy cream and condensed milk. That's why our bars bite like fudge, not like ice.",
  },
  {
    number: '02',
    title: 'Real Fruit, Not Syrup',
    body: "We cut the fruit by hand and drop it straight into the molds. You'll find pieces.",
  },
  {
    number: '03',
    title: 'Like Abuelita Made It',
    body: "Old recipes, made by hand. No shortcuts, no fillers — the way it's done at home.",
  },
]

const LOCATION = {
  street: '3448 US-9W',
  city: 'Highland, NY 12528',
  hoursShort: '11 AM – 7 PM',
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

function useReveal({ threshold = 0.15, rootMargin = '0px 0px -64px 0px' } = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('in-view')
      return
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view')
          obs.unobserve(el)
        }
      },
      { threshold, rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin])
  return ref
}

function useParallax(intensity = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        el.style.transform = `translate3d(0, ${y * intensity}px, 0)`
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [intensity])
  return ref
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

function NavBar({ onFindUs }) {
  const scrolled = useScrolled(8)
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '#menu', label: 'Menu' },
    { href: '#location', label: 'Find Us' },
    { href: '#philosophy', label: 'Our Philosophy' },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ease-fluid ${
        scrolled
          ? 'bg-paper/75 backdrop-blur-xl border-b border-ink/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <span className="font-display text-2xl font-600 tracking-tightest text-ink">
            Elyra
          </span>
          <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-rose-500 transition-colors duration-300 group-hover:bg-rose-600" />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-umber/80 hover:text-ink transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onFindUs}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper shadow-sm transition-[transform,box-shadow,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#23200E]"
          >
            <Navigation className="h-4 w-4" strokeWidth={1.75} />
            Find Us
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors duration-300 hover:bg-ink/5"
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/5 bg-paper/95 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink transition-colors duration-300 hover:bg-ink/5"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                onFindUs()
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper"
            >
              <Navigation className="h-4 w-4" /> Find Us
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ onSeeMenu, onFindUs }) {
  const blobA = useParallax(0.14)
  const blobB = useParallax(-0.08)
  const blobC = useParallax(0.06)

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-48 pb-24 lg:pb-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-[#F8F1DF] to-paper" />
        <div
          ref={blobA}
          className="gpu absolute -top-40 right-[-12%] h-[34rem] w-[34rem] rounded-full bg-orange-300/45 blur-[110px]"
        />
        <div
          ref={blobB}
          className="gpu absolute top-40 left-[-12%] h-[26rem] w-[26rem] rounded-full bg-rose-300/40 blur-[110px]"
        />
        <div
          ref={blobC}
          className="gpu absolute bottom-0 left-1/2 -translate-x-1/2 h-[22rem] w-[58rem] rounded-full bg-amber-200/40 blur-[120px]"
        />
        <div className="absolute inset-0 paper-grain opacity-60" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-8 lg:gap-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/60 backdrop-blur px-3.5 py-1.5 text-xs font-medium tracking-wide text-umber animate-subtle-rise">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
            </span>
            Highland, NY · Open every day · 11–7
          </span>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.02] tracking-tightest text-ink text-balance max-w-5xl animate-subtle-rise"
            style={{ animationDelay: '80ms' }}
          >
            Mexican Paletas.
            <br className="hidden sm:block" />{' '}
            <span className="text-taupe">This Summer.</span>
          </h1>

          <p
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-umber/85 text-pretty animate-subtle-rise"
            style={{ animationDelay: '160ms' }}
          >
            Real fruit. Real cream. No stabilizers, no shortcuts.
          </p>

          <div
            className="flex flex-wrap items-center gap-4 animate-subtle-rise"
            style={{ animationDelay: '240ms' }}
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-ink text-paper pl-5 pr-5 py-2.5 shadow-[0_18px_40px_-18px_rgba(26,22,16,0.35)]">
              <span className="text-sm font-semibold tracking-wide">$4 Single</span>
              <span className="h-4 w-px bg-paper/20" />
              <span className="text-sm font-semibold tracking-wide">2 for $6</span>
            </span>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 animate-subtle-rise"
            style={{ animationDelay: '320ms' }}
          >
            <button
              onClick={onSeeMenu}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper shadow-sm transition-[transform,box-shadow,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:shadow-xl hover:bg-[#23200E]"
            >
              See the Menu
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-fluid group-hover:translate-x-1" />
            </button>
            <button
              onClick={onFindUs}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper/60 backdrop-blur px-7 py-3.5 text-sm font-medium text-ink transition-[transform,border-color,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:border-ink/30 hover:bg-paper/90"
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

function FlavorCard({ flavor, onOpen, index }) {
  return (
    <button
      onClick={() => onOpen(flavor)}
      style={{ '--i': index }}
      className={`group relative flex flex-col text-left rounded-3xl border border-ink/[0.07] ${flavor.cardBg} p-7 sm:p-8 transition-[transform,box-shadow,border-color] duration-500 ease-fluid hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(26,22,16,0.18)] ${flavor.cardHover} overflow-hidden h-full gpu`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 -top-8 h-44 bg-gradient-to-b ${flavor.wash}`}
      />

      <div className="relative flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-2 rounded-full bg-paper/70 border border-ink/[0.06] px-3 py-1 text-[11px] font-medium tracking-wide uppercase ${flavor.accent}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${flavor.dot}`} />
          Cream Base
        </span>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/70 border border-ink/[0.06] text-umber transition-[background-color,color,border-color,transform] duration-500 ease-fluid group-hover:bg-ink group-hover:text-paper group-hover:border-ink group-hover:rotate-[-8deg]"
          aria-hidden
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="relative mt-16 sm:mt-20">
        <h3 className="font-display text-2xl sm:text-[1.75rem] leading-tight tracking-tight text-ink">
          {flavor.name}
        </h3>
        <p className={`mt-1 text-sm font-medium ${flavor.accent}`}>{flavor.english}</p>
        <p className="mt-4 text-sm leading-relaxed text-umber/85">{flavor.tagline}</p>
      </div>

      <div className="relative mt-auto pt-10 flex items-end justify-between text-xs text-taupe">
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-1 w-1 rounded-full ${flavor.dot}`} />
          {flavor.calories} kcal · per bar
        </span>
        <span className="font-medium text-ink">View Details</span>
      </div>
    </button>
  )
}

function MenuSection({ onOpenFlavor }) {
  const headerRef = useReveal()
  const gridRef = useReveal({ threshold: 0.1 })

  return (
    <section id="menu" className="relative py-24 lg:py-32 bg-paper">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={headerRef}
          className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-taupe">
              The Menu
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
              Four flavors.
              <br className="hidden sm:block" />{' '}
              <span className="text-taupe">Made this morning.</span>
            </h2>
          </div>
          <p className="max-w-md text-umber/85 leading-relaxed">
            Tap a flavor for the full ingredient list. Every bar is made and frozen the day we sell it.
          </p>
        </div>

        <div
          ref={gridRef}
          className="stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch"
        >
          {flavors.map((flavor, i) => (
            <FlavorCard
              key={flavor.id}
              flavor={flavor}
              onOpen={onOpenFlavor}
              index={i}
            />
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
      <div className="absolute inset-0 bg-ink/35 backdrop-blur-md" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl bg-cream sm:rounded-3xl rounded-t-3xl shadow-[0_40px_80px_-20px_rgba(26,22,16,0.35)] border border-ink/[0.06] overflow-hidden animate-scale-in"
      >
        <div className="relative h-36 sm:h-44 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${flavor.modalWash}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" />
          <div className="absolute inset-0 paper-grain opacity-50" />
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/80 backdrop-blur border border-ink/10 text-ink shadow-sm transition-[background-color,color,transform] duration-500 ease-fluid hover:bg-ink hover:text-paper hover:rotate-90"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full bg-paper/80 border border-ink/[0.06] px-3 py-1 text-[11px] font-medium tracking-wide uppercase ${flavor.accent}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${flavor.dot}`} />
              Cream Base
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-7 sm:py-9 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                id="flavor-modal-title"
                className="font-display text-3xl sm:text-4xl tracking-tightest text-ink leading-tight"
              >
                {flavor.name}
              </h3>
              <p className={`mt-1 text-sm font-medium ${flavor.accent}`}>{flavor.english}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display text-3xl tracking-tightest text-ink">
                {flavor.calories}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-taupe mt-0.5">
                kcal / bar
              </div>
            </div>
          </div>

          <p className="mt-5 text-umber leading-relaxed">{flavor.description}</p>

          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
              Ingredients
            </h4>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {flavor.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-start gap-3 text-sm text-ink"
                >
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${flavor.dot}`} />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-ink/[0.07] bg-paper/60 px-5 py-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-taupe">
              Allergens
            </div>
            <p className="mt-1.5 text-sm text-umber leading-relaxed">
              Contains dairy. May contain tree nuts. No artificial stabilizers, emulsifiers, or colors.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LocationSection() {
  const headerRef = useReveal()
  const cardsRef = useReveal({ threshold: 0.1 })

  return (
    <section id="location" className="relative py-24 lg:py-32 bg-oat">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-[-10%] h-[26rem] w-[26rem] rounded-full bg-emerald-300/25 blur-[110px]" />
        <div className="absolute -bottom-20 left-[-10%] h-[22rem] w-[22rem] rounded-full bg-amber-200/40 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          ref={headerRef}
          className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16"
        >
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-taupe">
              Find Us
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
              On 9W.
              <span className="text-taupe"> Every day.</span>
            </h2>
          </div>
          <p className="max-w-md text-umber/85 leading-relaxed">
            Same spot all summer in Highland, NY. Pull over, grab a bar, keep going.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="stagger grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          <div
            style={{ '--i': 0 }}
            className="lg:col-span-3 rounded-3xl border border-ink/[0.07] bg-cream p-7 sm:p-10 shadow-[0_1px_0_rgba(26,22,16,0.03)] relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
                The Stand
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border border-emerald-300/50">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 animate-pulse-dot" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                Open Now
              </span>
            </div>

            <div className="relative mt-8">
              <div className="text-[11px] uppercase tracking-[0.22em] text-taupe">
                Open for the Summer
              </div>
              <div className="mt-3 flex items-start gap-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-paper border border-ink/[0.07] text-ink shrink-0">
                  <MapPin className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-display text-3xl sm:text-[2rem] leading-tight tracking-tight text-ink">
                    {LOCATION.street}
                  </p>
                  <p className="mt-1 text-umber/85">{LOCATION.city}</p>
                </div>
              </div>
            </div>

            <div className="relative mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={LOCATION.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-[transform,box-shadow,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#23200E]"
              >
                <Navigation className="h-4 w-4" strokeWidth={1.8} />
                Open in Maps
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform duration-500 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </a>
              <a
                href={`https://www.google.com/maps/place/${encodeURIComponent(
                  `${LOCATION.street}, ${LOCATION.city}`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-6 py-3 text-sm font-medium text-ink transition-[transform,border-color,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:border-ink/30"
              >
                Copy Address
              </a>
            </div>
          </div>

          <div
            style={{ '--i': 1 }}
            className="lg:col-span-2 rounded-3xl border border-ink/[0.07] bg-cream p-7 sm:p-10 shadow-[0_1px_0_rgba(26,22,16,0.03)] flex flex-col"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
              Hours
            </span>

            <div className="mt-6 flex items-start gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-paper border border-ink/[0.07] text-ink shrink-0">
                <Clock className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-display text-3xl sm:text-[2rem] leading-tight tracking-tight text-ink">
                  11 AM – 7 PM
                </p>
                <p className="mt-1 text-umber/85 inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-taupe" strokeWidth={1.8} />
                  Open every day
                </p>
              </div>
            </div>

            <div className="mt-auto pt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-ink/[0.07] bg-paper px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-taupe inline-flex items-center gap-1.5">
                  <CreditCard className="h-3 w-3" strokeWidth={1.8} />
                  Card
                </div>
                <div className="mt-1.5 font-medium text-ink">Tap & Apple Pay</div>
              </div>
              <div className="rounded-2xl border border-ink/[0.07] bg-paper px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-taupe inline-flex items-center gap-1.5">
                  <Wallet className="h-3 w-3" strokeWidth={1.8} />
                  Cash
                </div>
                <div className="mt-1.5 font-medium text-ink">Always welcome</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  const headerRef = useReveal()
  const gridRef = useReveal({ threshold: 0.1 })

  return (
    <section id="philosophy" className="relative py-24 lg:py-32 bg-paper">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={headerRef} className="reveal max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-taupe">
            Our Philosophy
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
            How we make them.
          </h2>
          <p className="mt-6 text-umber/85 leading-relaxed max-w-2xl">
            From the cream we buy to the way we freeze the bars, we keep it simple. Real fruit. Real cream. Made by hand. Sold the same day.
          </p>
        </div>

        <div
          ref={gridRef}
          className="stagger mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {pillars.map(({ number, title, body }, i) => (
            <div
              key={title}
              style={{ '--i': i }}
              className="group relative flex flex-col rounded-3xl border border-ink/[0.07] bg-cream p-8 transition-[transform,box-shadow,border-color] duration-500 ease-fluid hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-20px_rgba(26,22,16,0.18)] hover:border-ink/15 h-full overflow-hidden"
            >
              <div className="absolute -top-6 -right-2 font-display text-[10rem] leading-none tracking-tightest text-ink/[0.05] select-none pointer-events-none transition-[color] duration-700 ease-fluid group-hover:text-ink/[0.08]">
                {number}
              </div>
              <div className="relative">
                <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-taupe">
                  {number} / {String(pillars.length).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-2xl sm:text-[1.65rem] tracking-tight text-ink leading-tight">
                  {title}
                </h3>
                <p className="mt-3 text-umber/85 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative bg-ink text-paper">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="font-display text-4xl sm:text-5xl tracking-tightest">Elyra</div>
            <p className="mt-3 text-paper/70 text-sm tracking-wide">Cold bars on 9W.</p>
            <p className="mt-1 text-paper/50 text-sm">
              {LOCATION.street}, {LOCATION.city} · {LOCATION.hoursShort}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-4 py-2.5 text-sm font-medium transition-[background-color,color,transform] duration-500 ease-fluid hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.6} />
              @elyra.paletas
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-[transform,opacity] duration-500 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-4 py-2.5 text-sm font-medium transition-[background-color,color,transform] duration-500 ease-fluid hover:-translate-y-0.5 hover:bg-paper hover:text-ink"
            >
              <Music2 className="h-4 w-4" strokeWidth={1.6} />
              @elyra
              <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-[transform,opacity] duration-500 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-paper/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-paper/50">
          <div>© {new Date().getFullYear()} Elyra Paletas. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#menu" className="transition-colors duration-300 hover:text-paper">Menu</a>
            <a href="#location" className="transition-colors duration-300 hover:text-paper">Find Us</a>
            <a href="#philosophy" className="transition-colors duration-300 hover:text-paper">Philosophy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [activeFlavor, setActiveFlavor] = useState(null)

  const scrollToLocation = () => {
    const el = document.getElementById('location')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <NavBar onFindUs={scrollToLocation} />
      <main>
        <Hero onSeeMenu={scrollToMenu} onFindUs={scrollToLocation} />
        <MenuSection onOpenFlavor={setActiveFlavor} />
        <LocationSection />
        <PhilosophySection />
      </main>
      <Footer />
      <FlavorModal flavor={activeFlavor} onClose={() => setActiveFlavor(null)} />
    </div>
  )
}

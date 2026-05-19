import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Music2,
  Navigation,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react'

const flavors = [
  {
    id: 'fresas',
    name: 'Fresas con Crema',
    english: 'Strawberry Cream',
    tagline: 'Voluptuous frozen strawberries, swirled in real cream.',
    description:
      'Voluptuous real frozen strawberries pureed into a rich cream base, layered with hand-cut fresh strawberry pieces.',
    calories: 200,
    ingredients: [
      'Real Strawberries',
      'Sweetened Condensed Milk',
      'Heavy Whipping Cream',
      'Authentic Mexican Crema',
      'Whole Milk',
      'Vanilla Extract',
    ],
    tint: 'bg-rose-50/70',
    tintSolid: 'bg-rose-50',
    accent: 'text-rose-700',
    accentBorder: 'hover:border-rose-200',
    chip: 'bg-rose-100/80 text-rose-800',
    swatch: 'from-rose-100 via-rose-50 to-white',
    modalAccent: 'bg-rose-500',
  },
  {
    id: 'mango',
    name: 'Mango con Crema',
    english: 'Mango Cream',
    tagline: 'Sun-ripened Alphonso mango, folded into sweet cream.',
    description:
      'Velvety, sun-ripened mango chunks blended into our signature sweet cream base for a smooth tropical finish.',
    calories: 190,
    ingredients: [
      'Alphonso Mango Puree',
      'Sweetened Condensed Milk',
      'Heavy Whipping Cream',
      'Mexican Crema',
      'Whole Milk',
    ],
    tint: 'bg-amber-50/70',
    tintSolid: 'bg-amber-50',
    accent: 'text-amber-700',
    accentBorder: 'hover:border-amber-200',
    chip: 'bg-amber-100/80 text-amber-800',
    swatch: 'from-amber-100 via-amber-50 to-white',
    modalAccent: 'bg-amber-500',
  },
  {
    id: 'coco',
    name: 'Coco Loco',
    english: 'Coconut Cream',
    tagline: 'Fudge-dense coconut, weighted with toasted shred.',
    description:
      'An ultra-dense, fudge-like coconut milk cream loaded with premium toasted shredded coconut for texture.',
    calories: 240,
    ingredients: [
      'Premium Coconut Milk',
      'Sweetened Condensed Milk',
      'Heavy Cream',
      'Organic Toasted Shredded Coconut',
    ],
    tint: 'bg-stone-50/70',
    tintSolid: 'bg-stone-50',
    accent: 'text-stone-700',
    accentBorder: 'hover:border-stone-300',
    chip: 'bg-stone-100/80 text-stone-800',
    swatch: 'from-stone-100 via-stone-50 to-white',
    modalAccent: 'bg-stone-700',
  },
  {
    id: 'horchata',
    name: 'Horchata Classic',
    english: 'Cinnamon & Rice Milk',
    tagline: 'House-brewed rice milk, real Ceylon cinnamon.',
    description:
      'A traditional Mexican classic frozen into a rich bar, infused with real cinnamon and sweet condensed milk.',
    calories: 180,
    ingredients: [
      'House-Brewed Rice Milk',
      'Whole Milk',
      'Sweetened Condensed Milk',
      'Pure Vanilla Extract',
      'Ground Ceylon Cinnamon',
    ],
    tint: 'bg-orange-50/60',
    tintSolid: 'bg-orange-50',
    accent: 'text-orange-800',
    accentBorder: 'hover:border-orange-200',
    chip: 'bg-orange-100/80 text-orange-900',
    swatch: 'from-orange-100 via-orange-50 to-white',
    modalAccent: 'bg-orange-600',
  },
]

const schedule = [
  { day: 'Tuesday', hours: '11:30a – 2:30p', stop: 'Mission & 22nd, Plaza Norte' },
  { day: 'Wednesday', hours: '12:00p – 3:00p', stop: 'Wynwood Walls, NW 25th St' },
  { day: 'Thursday', hours: '11:00a – 2:00p', stop: 'Brickell City Centre, S Miami Ave' },
  { day: 'Friday', hours: '4:00p – 9:00p', stop: 'Bayfront Park — Friday Night Market' },
  { day: 'Saturday', hours: '10:00a – 4:00p', stop: 'Lincoln Road, Soundscape Park' },
  { day: 'Sunday', hours: '11:00a – 3:00p', stop: 'Coconut Grove Farmers Market' },
]

const pillars = [
  {
    icon: Sparkles,
    title: 'The Right Density',
    body: 'Heavy fat creams and sweet condensed milk create a rich, dense, fudge-like bite.',
  },
  {
    icon: ShieldCheck,
    title: 'Real Fruit First',
    body: 'Hand-chopped fresh pieces distributed directly into the mold grids.',
  },
  {
    icon: Truck,
    title: 'Zero Waste Distribution',
    body: 'Prepped in a licensed local commissary, frozen in industrial steel, and served raw curbside.',
  },
]

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

function NavBar({ onFindTruck }) {
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
    { href: '#tracker', label: 'Truck Tracker' },
    { href: '#philosophy', label: 'Our Philosophy' },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/75 backdrop-blur-xl border-b border-slate-100'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <span className="font-display text-2xl font-600 tracking-tightest text-ink">
            Elyra
          </span>
          <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-rose-400 group-hover:bg-rose-500 transition-all duration-300" />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-ink transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onFindTruck}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-lg hover:bg-slate-800 transition-all duration-300"
          >
            <Navigation className="h-4 w-4" strokeWidth={1.75} />
            Find the Truck
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all duration-300"
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white/90 backdrop-blur-xl animate-fade-in">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false)
                onFindTruck()
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white"
            >
              <Navigation className="h-4 w-4" /> Find the Truck
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ onExploreMenu, onLiveTracker }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40 lg:pt-48 pb-20 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
        <div className="absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-rose-100/40 blur-3xl" />
        <div className="absolute top-40 left-[-10%] h-[26rem] w-[26rem] rounded-full bg-amber-100/40 blur-3xl" />
        <div className="absolute inset-0 grain opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start gap-8 lg:gap-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 backdrop-blur px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-700 animate-subtle-rise">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Mobile · Spun daily · Served curbside
          </span>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.02] tracking-tightest text-ink text-balance max-w-5xl animate-subtle-rise"
            style={{ animationDelay: '60ms' }}
          >
            Artisanal Paletas.
            <br className="hidden sm:block" />{' '}
            <span className="text-slate-500">Hand-Crafted on the Move.</span>
          </h1>

          <p
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600 text-pretty animate-subtle-rise"
            style={{ animationDelay: '120ms' }}
          >
            Small-batch, premium dairy bases spun daily with real fruit. No artificial stabilizers.
          </p>

          <div
            className="flex flex-wrap items-center gap-4 animate-subtle-rise"
            style={{ animationDelay: '180ms' }}
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-ink text-white pl-5 pr-2 py-2 shadow-sm">
              <span className="text-sm font-semibold tracking-wide">$4 Single</span>
              <span className="h-5 w-px bg-white/20" />
              <span className="text-sm font-semibold tracking-wide">2 for $6 Deal</span>
              <span className="ml-1 inline-flex items-center justify-center rounded-full bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/80">
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
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-white shadow-sm hover:shadow-xl hover:bg-slate-800 transition-all duration-300"
            >
              Explore Menu
              <ArrowRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={onLiveTracker}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur px-7 py-3.5 text-sm font-medium text-slate-800 hover:border-slate-300 hover:bg-white transition-all duration-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-pulse-dot" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live Tracker
            </button>
          </div>
        </div>

        <div
          className="mt-20 lg:mt-28 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6 border-t border-slate-200/70 pt-10 animate-subtle-rise"
          style={{ animationDelay: '320ms' }}
        >
          {[
            ['12', 'Hand-spun flavors / month'],
            ['0', 'Artificial stabilizers'],
            ['48hr', 'From batch to bar'],
            ['1', 'Licensed commissary'],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col">
              <span className="font-display text-3xl sm:text-4xl tracking-tightest text-ink">
                {value}
              </span>
              <span className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-snug max-w-[14ch]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlavorCard({ flavor, onOpen }) {
  return (
    <button
      onClick={() => onOpen(flavor)}
      className={`group relative flex flex-col text-left rounded-3xl border border-slate-100 ${flavor.tint} p-7 sm:p-8 backdrop-blur-sm shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:-translate-y-1 hover:shadow-xl ${flavor.accentBorder} transition-all duration-300`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-32 rounded-t-3xl bg-gradient-to-b ${flavor.swatch} opacity-80 pointer-events-none`}
      />
      <div className="relative flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full ${flavor.chip} px-3 py-1 text-[11px] font-medium tracking-wide uppercase`}
        >
          <Sparkles className="h-3 w-3" strokeWidth={2} />
          Premium Dairy Base
        </span>
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 border border-slate-100 text-slate-500 group-hover:bg-ink group-hover:text-white group-hover:border-ink transition-all duration-300"
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
        <p className="mt-4 text-sm leading-relaxed text-slate-600">{flavor.tagline}</p>
      </div>

      <div className="relative mt-8 flex items-center justify-between text-xs text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          {flavor.calories} kcal · per bar
        </span>
        <span className="font-medium text-ink">View Details</span>
      </div>
    </button>
  )
}

function MenuSection({ onOpenFlavor }) {
  return (
    <section id="menu" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 lg:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              The Menu
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
              Four signatures.
              <br className="hidden sm:block" /> <span className="text-slate-500">All spun this morning.</span>
            </h2>
          </div>
          <p className="max-w-md text-slate-600 leading-relaxed">
            Tap any flavor for full ingredient transparency and calibrated calorie profiles. Every
            bar is portioned, frozen, and served the same day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
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
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl border border-slate-100 overflow-hidden animate-scale-in"
      >
        <div className={`relative h-32 sm:h-40 bg-gradient-to-br ${flavor.swatch}`}>
          <div className="absolute inset-0 grain opacity-40" />
          <button
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur border border-slate-100 text-slate-700 hover:bg-white hover:text-ink shadow-sm transition-all duration-300"
          >
            <X className="h-4.5 w-4.5" />
          </button>
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full ${flavor.chip} px-3 py-1 text-[11px] font-medium tracking-wide uppercase`}
            >
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Premium Dairy Base
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
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mt-0.5">
                kcal / bar
              </div>
            </div>
          </div>

          <p className="mt-5 text-slate-600 leading-relaxed">{flavor.description}</p>

          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Ingredients
            </h4>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {flavor.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-start gap-3 text-sm text-slate-700"
                >
                  <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${flavor.modalAccent}`} />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 flex items-center gap-4">
            <ShieldCheck className="h-5 w-5 text-slate-500 shrink-0" strokeWidth={1.6} />
            <p className="text-xs text-slate-600 leading-relaxed">
              No artificial stabilizers, emulsifiers, or colors. Allergens may include dairy and
              tree nuts depending on the truck's daily prep.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TrackerSection() {
  return (
    <section id="tracker" className="relative py-24 lg:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
              Where is Elyra?
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
              Live truck tracker.
            </h2>
          </div>
          <p className="max-w-md text-slate-600 leading-relaxed">
            We move daily. Routes update by 9am — set a reminder for your closest stop and we'll
            pull up curbside.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-3xl border border-slate-100 bg-white p-7 sm:p-8 shadow-[0_1px_0_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Current Location
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border border-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-pulse-dot" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live
              </span>
            </div>

            <div className="mt-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                Live Right Now
              </div>
              <div className="mt-2 flex items-start gap-3">
                <MapPin className="h-5 w-5 text-ink mt-1 shrink-0" strokeWidth={1.6} />
                <p className="font-display text-2xl sm:text-[1.6rem] leading-tight tracking-tight text-ink">
                  Lincoln Road & Meridian Ave, Miami Beach
                </p>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Posted up by Soundscape Park. Look for the matte-black truck with the rose neon.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Until
                </div>
                <div className="mt-1.5 font-medium text-ink inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" strokeWidth={1.8} /> 4:00 PM
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  Wait
                </div>
                <div className="mt-1.5 font-medium text-ink">~ 4 min</div>
              </div>
            </div>

            <button
              type="button"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 hover:shadow-lg transition-all duration-300"
            >
              <Navigation className="h-4 w-4" strokeWidth={1.8} />
              Open Directions
            </button>
          </div>

          <div className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white shadow-[0_1px_0_rgba(15,23,42,0.03)] overflow-hidden">
            <div className="flex items-center justify-between px-7 sm:px-8 py-5 border-b border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                This Week's Route
              </span>
              <span className="text-xs text-slate-400">All times local · ET</span>
            </div>

            <div className="hidden sm:grid grid-cols-12 px-7 sm:px-8 py-3 text-[11px] uppercase tracking-[0.18em] text-slate-400 border-b border-slate-100">
              <div className="col-span-3">Day</div>
              <div className="col-span-3">Hours</div>
              <div className="col-span-6">Stop</div>
            </div>

            <ul className="divide-y divide-slate-100">
              {schedule.map((row) => (
                <li
                  key={row.day}
                  className="grid grid-cols-1 sm:grid-cols-12 px-7 sm:px-8 py-5 gap-2 sm:gap-0 hover:bg-slate-50/60 transition-all duration-300"
                >
                  <div className="sm:col-span-3 font-medium text-ink">{row.day}</div>
                  <div className="sm:col-span-3 text-slate-600 inline-flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.8} />
                    {row.hours}
                  </div>
                  <div className="sm:col-span-6 text-slate-700 inline-flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 mt-1 shrink-0" strokeWidth={1.8} />
                    <span>{row.stop}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection() {
  return (
    <section id="philosophy" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Our Philosophy
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
            Three pillars.
            <span className="text-slate-500"> Zero compromises.</span>
          </h2>
          <p className="mt-6 text-slate-600 leading-relaxed max-w-2xl">
            Every choice — from cream sourcing to freezing protocol — is engineered around density,
            integrity, and freshness. This is the discipline behind a bar that won't melt on you.
          </p>
        </div>

        <div className="mt-14 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-8 hover:-translate-y-1 hover:shadow-xl hover:border-slate-200 transition-all duration-300"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-ink border border-slate-100 group-hover:bg-ink group-hover:text-white group-hover:border-ink transition-all duration-300">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-7 font-display text-2xl tracking-tight text-ink">{title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{body}</p>
              <div className="mt-7 pt-5 border-t border-slate-100 text-xs uppercase tracking-[0.22em] text-slate-400">
                Standard
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
    <footer className="relative bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="font-display text-4xl sm:text-5xl tracking-tightest">Elyra</div>
            <p className="mt-3 text-white/60 text-sm tracking-wide">Catch us curbside.</p>
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
            <a href="#tracker" className="hover:text-white transition-all duration-300">Tracker</a>
            <a href="#philosophy" className="hover:text-white transition-all duration-300">Philosophy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [activeFlavor, setActiveFlavor] = useState(null)
  const trackerRef = useRef(null)
  const menuRef = useRef(null)

  const scrollToTracker = () => {
    const el = document.getElementById('tracker')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white text-ink antialiased">
      <NavBar onFindTruck={scrollToTracker} />
      <main>
        <Hero onExploreMenu={scrollToMenu} onLiveTracker={scrollToTracker} />
        <div ref={menuRef}>
          <MenuSection onOpenFlavor={setActiveFlavor} />
        </div>
        <div ref={trackerRef}>
          <TrackerSection />
        </div>
        <PhilosophySection />
      </main>
      <Footer />
      <FlavorModal flavor={activeFlavor} onClose={() => setActiveFlavor(null)} />
    </div>
  )
}

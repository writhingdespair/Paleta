import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  Instagram,
  Loader2,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Music2,
  Navigation,
  Plus,
  ShoppingBag,
  Trash2,
  Wallet,
  X,
} from 'lucide-react'

const STORAGE_KEY = 'elyra-lang'
const SINGLE_PRICE = 4
const PAIR_PRICE = 6

const COPY = {
  en: {
    nav: {
      menu: 'Menu',
      findUs: 'Find Us',
      philosophy: 'Our Philosophy',
      cta: 'Find Us',
      langLabel: 'Language',
    },
    hero: {
      pill: 'Highland, NY · Open every day · 11–7',
      title: ['Mexican Paletas.', 'This Summer.'],
      subtitle: 'Real fruit. Real cream. No stabilizers, no shortcuts.',
      single: '$4 Single',
      deal: '2 for $6',
      seeMenu: 'See the Menu',
      findUs: 'Find Us',
    },
    menu: {
      eyebrow: 'The Menu',
      title: ['Four flavors.', 'Made this morning.'],
      blurb:
        'Tap a flavor for the full ingredient list. Every bar is made and frozen the day we sell it.',
      chip: 'Cream Base',
      perBar: 'per bar',
      viewDetails: 'View Details',
    },
    modal: {
      kcalBar: 'kcal / bar',
      ingredients: 'Ingredients',
      allergens: 'Allergens',
      allergenNote:
        'Contains dairy. May contain tree nuts. No artificial stabilizers, emulsifiers, or colors.',
      close: 'Close details',
      quantity: 'Quantity',
      add: 'Add to Cart',
      added: 'Added',
    },
    note: null,
    location: {
      eyebrow: 'Find Us',
      title: ['On 9W.', 'Every day.'],
      blurb:
        'Same spot all summer in Highland, NY. Pull over, grab a bar, keep going.',
      stand: 'The Stand',
      openNow: 'Open Now',
      openSummer: 'Open for the Summer',
      hours: 'Hours',
      hoursValue: '11 AM – 7 PM',
      everyDay: 'Open every day',
      card: 'Card',
      cardValue: 'Tap & Apple Pay',
      cash: 'Cash',
      cashValue: 'Always welcome',
      openMaps: 'Open in Maps',
      copyAddress: 'Copy Address',
    },
    philosophy: {
      eyebrow: 'Our Philosophy',
      title: 'How we make them.',
      blurb:
        'From the cream we buy to the way we freeze the bars, we keep it simple. Real fruit. Real cream. Made by hand. Sold the same day.',
    },
    footer: {
      tagline: 'Cold bars on 9W.',
      rights: 'All rights reserved.',
    },
    picker: {
      eyebrow: 'Welcome · Bienvenido',
      heading: 'Choose your language',
      sub: 'Elige tu idioma',
      en: 'English',
      enHi: 'Hello.',
      es: 'Español',
      esHi: 'Hola.',
      remember: 'Remember · Recordar',
    },
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty.',
      emptyHint: 'Pick a flavor from the menu to get started.',
      itemSingular: 'bar',
      itemPlural: 'bars',
      subtotal: 'Subtotal',
      deal: '2-for-$6 Deal',
      total: 'Total',
      checkout: 'Checkout',
      seeMenu: 'See the Menu',
      open: 'Open cart',
      close: 'Close cart',
      remove: 'Remove',
      pickupNote: 'Pickup at 3448 US-9W, Highland, NY · Ready in 5 min.',
    },
    checkout: {
      title: 'Checkout',
      back: 'Back to cart',
      demoLabel: 'Demo Mode',
      demoNote:
        "No real charge will be made. We'll switch this to Stripe before launch.",
      summary: 'Order Summary',
      payment: 'Payment',
      cardName: 'Name on card',
      cardNamePlaceholder: 'Maria Reyes',
      cardNumber: 'Card number',
      cardExpiry: 'Expiry',
      cardCvc: 'CVC',
      useDemoCard: 'Fill demo card',
      pay: 'Pay',
      processing: 'Processing…',
      successTitle: 'Order Confirmed.',
      successNote:
        "We'll have your bars ready when you pull up at the stand.",
      orderNumberLabel: 'Order',
      done: 'Done',
    },
  },
  es: {
    nav: {
      menu: 'Menú',
      findUs: 'Encuéntranos',
      philosophy: 'Filosofía',
      cta: 'Encuéntranos',
      langLabel: 'Idioma',
    },
    hero: {
      pill: 'Highland, NY · Abierto todos los días · 11–7',
      title: ['Paletas Mexicanas.', 'Este Verano.'],
      subtitle:
        'Fruta natural. Crema de la buena. Sin estabilizadores. Sin atajos.',
      single: '$4 c/u',
      deal: '2 x $6',
      seeMenu: 'Ver el Menú',
      findUs: 'Encuéntranos',
    },
    menu: {
      eyebrow: 'El Menú',
      title: ['Cuatro sabores.', 'Hechas esta mañana.'],
      blurb:
        'Toca un sabor para ver los ingredientes. Cada paleta se hace y se congela el mismo día que la vendemos.',
      chip: 'Base de Crema',
      perBar: 'por paleta',
      viewDetails: 'Ver Detalles',
    },
    modal: {
      kcalBar: 'kcal / paleta',
      ingredients: 'Ingredientes',
      allergens: 'Alérgenos',
      allergenNote:
        'Contiene lácteos. Puede contener nueces. Sin estabilizadores, emulsificantes ni colorantes artificiales.',
      close: 'Cerrar detalles',
      quantity: 'Cantidad',
      add: 'Agregar al Carrito',
      added: 'Agregada',
    },
    note: {
      eyebrow: 'Una nota',
      title: 'Como las de Guerrero.',
      body: 'Crecimos comiendo paletas en Guerrero — esas de crema espesa, con fresa de verdad, que vendían en carritos por las plazas en el calor del verano. Cuando llegamos al valle del Hudson, no las encontramos por ningún lado. Así que decidimos hacerlas nosotros mismos: mismas recetas, mismo cariño, mismo sabor de infancia. Ahora, aquí en la 9W.',
      sign: '— La familia Elyra',
    },
    location: {
      eyebrow: 'Encuéntranos',
      title: ['En la 9W.', 'Todos los días.'],
      blurb:
        'Mismo lugar todo el verano en Highland, NY. Te paras, agarras una paleta, y sigues con tu día.',
      stand: 'El Puesto',
      openNow: 'Abierto',
      openSummer: 'Abierto Todo el Verano',
      hours: 'Horario',
      hoursValue: '11 AM – 7 PM',
      everyDay: 'Abierto todos los días',
      card: 'Tarjeta',
      cardValue: 'Tap y Apple Pay',
      cash: 'Efectivo',
      cashValue: 'Siempre bienvenido',
      openMaps: 'Abrir en Maps',
      copyAddress: 'Copiar Dirección',
    },
    philosophy: {
      eyebrow: 'Nuestra Filosofía',
      title: 'Así las hacemos.',
      blurb:
        'Desde la crema que escogemos hasta cómo las congelamos, lo hacemos sencillo. Fruta de verdad. Crema de verdad. Hechas a mano. Vendidas el mismo día — como debe ser.',
    },
    footer: {
      tagline: 'Paletas heladas en la 9W.',
      rights: 'Todos los derechos reservados.',
    },
    picker: {
      eyebrow: 'Welcome · Bienvenido',
      heading: 'Choose your language',
      sub: 'Elige tu idioma',
      en: 'English',
      enHi: 'Hello.',
      es: 'Español',
      esHi: 'Hola.',
      remember: 'Remember · Recordar',
    },
    cart: {
      title: 'Tu Carrito',
      empty: 'Tu carrito está vacío.',
      emptyHint: 'Escoge un sabor del menú para empezar.',
      itemSingular: 'paleta',
      itemPlural: 'paletas',
      subtotal: 'Subtotal',
      deal: 'Promo 2 x $6',
      total: 'Total',
      checkout: 'Pagar',
      seeMenu: 'Ver el Menú',
      open: 'Abrir carrito',
      close: 'Cerrar carrito',
      remove: 'Quitar',
      pickupNote:
        'Recoge en 3448 US-9W, Highland, NY · Listo en 5 minutos.',
    },
    checkout: {
      title: 'Pago',
      back: 'Volver al carrito',
      demoLabel: 'Modo Demo',
      demoNote:
        'No es un cobro real. Pronto lo conectamos a Stripe.',
      summary: 'Resumen del Pedido',
      payment: 'Pago',
      cardName: 'Nombre en la tarjeta',
      cardNamePlaceholder: 'María Reyes',
      cardNumber: 'Número de tarjeta',
      cardExpiry: 'Vencimiento',
      cardCvc: 'CVC',
      useDemoCard: 'Llenar tarjeta demo',
      pay: 'Pagar',
      processing: 'Procesando…',
      successTitle: 'Pedido confirmado.',
      successNote:
        'Tendremos tus paletas listas cuando llegues al puesto.',
      orderNumberLabel: 'Pedido',
      done: 'Listo',
    },
  },
}

const FLAVORS = [
  {
    id: 'fresas',
    name: 'Fresas con Crema',
    calories: 200,
    accent: 'text-rose-700',
    dot: 'bg-rose-500',
    wash: 'from-rose-200/70 via-rose-100/30 to-transparent',
    cardBg: 'bg-[#FBEEEA]',
    cardHover: 'hover:border-rose-300/80',
    modalWash: 'from-rose-300/70 via-rose-200/30 to-transparent',
    swatch: 'bg-rose-300',
    copy: {
      en: {
        english: 'Strawberry Cream',
        tagline: 'Strawberries and cream. Real ones.',
        description:
          'Real strawberries, sweet cream, a little condensed milk. We hand-cut the strawberries so you actually bite into them.',
        ingredients: [
          'Strawberries',
          'Sweetened Condensed Milk',
          'Heavy Cream',
          'Mexican Crema',
          'Whole Milk',
          'Vanilla',
        ],
      },
      es: {
        english: 'Estilo Guerrero',
        tagline: 'Fresas y crema. De las buenas.',
        description:
          'Fresas de verdad, crema dulce y un toque de leche condensada. Cortamos las fresas a mano para que las sientas en cada mordida — como las paletas de la plaza, pero con fresa fresca del valle del Hudson.',
        ingredients: [
          'Fresas',
          'Leche Condensada',
          'Crema Espesa',
          'Crema Mexicana',
          'Leche Entera',
          'Vainilla',
        ],
      },
    },
  },
  {
    id: 'mango',
    name: 'Mango con Crema',
    calories: 190,
    accent: 'text-amber-800',
    dot: 'bg-amber-500',
    wash: 'from-amber-200/70 via-amber-100/30 to-transparent',
    cardBg: 'bg-[#FBF1DC]',
    cardHover: 'hover:border-amber-300/80',
    modalWash: 'from-amber-300/70 via-amber-200/30 to-transparent',
    swatch: 'bg-amber-300',
    copy: {
      en: {
        english: 'Mango Cream',
        tagline: "Mango and cream. That's it.",
        description: 'Ripe mango blended into sweet cream. Smooth, bright, cold.',
        ingredients: [
          'Mango',
          'Sweetened Condensed Milk',
          'Heavy Cream',
          'Mexican Crema',
          'Whole Milk',
        ],
      },
      es: {
        english: 'Mango ataulfo, en crema',
        tagline: 'Mango y crema. Nada más.',
        description:
          'Mango bien maduro, batido con crema dulce. Suave, brillante, y bien fría — la indicada para el calor del verano.',
        ingredients: [
          'Mango',
          'Leche Condensada',
          'Crema Espesa',
          'Crema Mexicana',
          'Leche Entera',
        ],
      },
    },
  },
  {
    id: 'coco',
    name: 'Coco Loco',
    calories: 240,
    accent: 'text-stone-700',
    dot: 'bg-stone-500',
    wash: 'from-stone-200/70 via-stone-100/30 to-transparent',
    cardBg: 'bg-[#F5EFE2]',
    cardHover: 'hover:border-stone-300/80',
    modalWash: 'from-stone-300/70 via-stone-200/30 to-transparent',
    swatch: 'bg-stone-300',
    copy: {
      en: {
        english: 'Coconut Cream',
        tagline: 'Coconut cream, loaded with toasted coconut.',
        description:
          'Thick coconut cream loaded with toasted shredded coconut. Heavy bar, lots of texture.',
        ingredients: [
          'Coconut Milk',
          'Sweetened Condensed Milk',
          'Heavy Cream',
          'Toasted Shredded Coconut',
        ],
      },
      es: {
        english: 'Con coco tostado',
        tagline: 'Crema de coco, con harto coco encima.',
        description:
          'Crema de coco bien densa, con harto coco rallado tostado adentro. Una paleta pesada, con textura — de las que se sienten en la mordida.',
        ingredients: [
          'Leche de Coco',
          'Leche Condensada',
          'Crema Espesa',
          'Coco Rallado Tostado',
        ],
      },
    },
  },
  {
    id: 'horchata',
    name: 'Horchata Classic',
    calories: 180,
    accent: 'text-orange-800',
    dot: 'bg-orange-500',
    wash: 'from-orange-200/70 via-orange-100/30 to-transparent',
    cardBg: 'bg-[#FBEEDC]',
    cardHover: 'hover:border-orange-300/80',
    modalWash: 'from-orange-300/70 via-orange-200/30 to-transparent',
    swatch: 'bg-orange-300',
    copy: {
      en: {
        english: 'Cinnamon & Rice Milk',
        tagline: 'Rice milk, cinnamon. The way it should be.',
        description:
          'Rice milk, cinnamon, condensed milk — the classic, frozen into a thick bar.',
        ingredients: [
          'Rice Milk',
          'Whole Milk',
          'Sweetened Condensed Milk',
          'Vanilla',
          'Ceylon Cinnamon',
        ],
      },
      es: {
        english: 'La clásica, como debe ser',
        tagline: 'Horchata con canela. Como debe ser.',
        description:
          'Horchata de arroz, canela y leche condensada — la clásica de toda la vida, ahora en paleta gruesa y bien fría.',
        ingredients: [
          'Horchata de Arroz',
          'Leche Entera',
          'Leche Condensada',
          'Vainilla',
          'Canela de Ceilán',
        ],
      },
    },
  },
]

const PILLARS = {
  en: [
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
  ],
  es: [
    {
      number: '01',
      title: 'Espesa, No Aguada',
      body: 'Crema espesa y leche condensada. Por eso nuestras paletas se sienten densas, como deben ser — no como hielo aguado.',
    },
    {
      number: '02',
      title: 'Fruta de Verdad, No Jarabe',
      body: 'La fruta la cortamos a mano y la echamos directo al molde. Sí, vas a encontrar trozos.',
    },
    {
      number: '03',
      title: 'Como las Hacía la Abuela',
      body: 'Recetas de toda la vida, hechas a mano. Sin atajos, sin rellenos — como las hacíamos en casa.',
    },
  ],
}

const LOCATION = {
  street: '3448 US-9W',
  city: 'Highland, NY 12528',
  hoursShort: '11 AM – 7 PM',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=3448+US-9W+Highland+NY+12528',
}

// ---- Helpers ----

function priceCart(cart) {
  const count = cart.reduce((sum, item) => sum + item.qty, 0)
  const pairs = Math.floor(count / 2)
  const singles = count % 2
  const subtotal = count * SINGLE_PRICE
  const total = pairs * PAIR_PRICE + singles * SINGLE_PRICE
  const savings = subtotal - total
  return { count, subtotal, total, savings, pairs, singles }
}

const fmt = (n) => `$${n.toFixed(2)}`

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`
}

function generateOrderNumber() {
  const id = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `ELY-${id}`
}

// ---- Hooks ----

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

// ---- Language ----

const LangContext = createContext({ lang: 'en', t: COPY.en, setLang: () => {} })
const useLang = () => useContext(LangContext)

function LanguagePicker({ onChoose }) {
  const [remember, setRemember] = useState(true)
  const [hovered, setHovered] = useState(null)

  useLockBodyScroll(true)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-picker-title"
    >
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-[3px] animate-fade-in" />

      <div className="relative w-full max-w-[22rem] rounded-2xl border border-ink/[0.08] bg-cream p-6 sm:p-7 shadow-[0_30px_70px_-20px_rgba(26,22,16,0.45)] animate-scale-in">
        <div className="text-center">
          <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-taupe">
            Welcome · Bienvenido
          </div>
          <div className="mt-2.5 font-display text-4xl tracking-tightest text-ink leading-none">
            Elyra
          </div>
          <div className="mt-2.5 h-[2px] w-8 mx-auto rounded-full bg-rose-400" />
        </div>

        <div className="mt-5 text-center">
          <div id="lang-picker-title" className="font-display text-base text-ink">
            Choose your language
          </div>
          <div className="mt-0.5 text-xs text-taupe">Elige tu idioma</div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onChoose('en', remember)}
            onMouseEnter={() => setHovered('en')}
            onMouseLeave={() => setHovered(null)}
            className="group rounded-xl border border-ink/15 bg-paper px-4 py-4 text-left transition-[transform,border-color,box-shadow] duration-500 ease-fluid hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-[0_14px_30px_-16px_rgba(26,22,16,0.25)]"
          >
            <div className="font-display text-lg tracking-tight text-ink">
              English
            </div>
            <div className="mt-0.5 text-[11px] text-taupe inline-flex items-center gap-1">
              Hello.
              <ArrowRight
                className={`h-3 w-3 transition-[transform,opacity] duration-500 ease-fluid ${
                  hovered === 'en'
                    ? 'translate-x-0.5 opacity-100'
                    : '-translate-x-1 opacity-0'
                }`}
              />
            </div>
          </button>
          <button
            onClick={() => onChoose('es', remember)}
            onMouseEnter={() => setHovered('es')}
            onMouseLeave={() => setHovered(null)}
            className="group rounded-xl border border-ink/15 bg-paper px-4 py-4 text-left transition-[transform,border-color,box-shadow] duration-500 ease-fluid hover:-translate-y-0.5 hover:border-ink/40 hover:shadow-[0_14px_30px_-16px_rgba(26,22,16,0.25)]"
          >
            <div className="font-display text-lg tracking-tight text-ink">
              Español
            </div>
            <div className="mt-0.5 text-[11px] text-taupe inline-flex items-center gap-1">
              Hola.
              <ArrowRight
                className={`h-3 w-3 transition-[transform,opacity] duration-500 ease-fluid ${
                  hovered === 'es'
                    ? 'translate-x-0.5 opacity-100'
                    : '-translate-x-1 opacity-0'
                }`}
              />
            </div>
          </button>
        </div>

        <label className="mt-5 flex items-center justify-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="sr-only"
          />
          <span
            className={`relative inline-flex h-4 w-4 items-center justify-center rounded-[5px] border transition-colors duration-300 ${
              remember ? 'bg-ink border-ink' : 'bg-paper border-ink/30'
            }`}
            aria-hidden
          >
            {remember && <Check className="h-3 w-3 text-paper" strokeWidth={3} />}
          </span>
          <span className="text-[11px] text-taupe">
            Remember · Recordar
          </span>
        </label>
      </div>
    </div>
  )
}

function LanguageToggle() {
  const { lang, setLang, t } = useLang()
  const isEs = lang === 'es'

  return (
    <div
      className="inline-flex items-center rounded-full border border-ink/10 bg-paper/60 backdrop-blur p-0.5 text-[11px]"
      role="group"
      aria-label={t.nav.langLabel}
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={!isEs}
        className={`px-2.5 py-1.5 rounded-full font-semibold tracking-[0.18em] transition-[background-color,color] duration-300 ${
          !isEs ? 'bg-ink text-paper' : 'text-umber hover:text-ink'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('es')}
        aria-pressed={isEs}
        className={`px-2.5 py-1.5 rounded-full font-semibold tracking-[0.18em] transition-[background-color,color] duration-300 ${
          isEs ? 'bg-ink text-paper' : 'text-umber hover:text-ink'
        }`}
      >
        ES
      </button>
    </div>
  )
}

function CartButton({ count, onClick }) {
  const { t } = useLang()
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.cart.open}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper/60 backdrop-blur text-ink transition-[transform,background-color,border-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:bg-paper hover:border-ink/20"
    >
      <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-ink text-paper text-[10px] font-semibold tabular-nums leading-none animate-scale-in">
          {count}
        </span>
      )}
    </button>
  )
}

function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md' }) {
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

// ---- Sections ----

function NavBar({ onFindUs, cartCount, onOpenCart }) {
  const { t } = useLang()
  const scrolled = useScrolled(8)
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '#menu', label: t.nav.menu },
    { href: '#location', label: t.nav.findUs },
    { href: '#philosophy', label: t.nav.philosophy },
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

        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <CartButton count={cartCount} onClick={onOpenCart} />
          <button
            onClick={onFindUs}
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper shadow-sm transition-[transform,box-shadow,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#23200E]"
          >
            <Navigation className="h-4 w-4" strokeWidth={1.75} />
            {t.nav.cta}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors duration-300 hover:bg-ink/5"
            aria-label="Menu"
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
            <div className="mt-2 flex items-center justify-between gap-3 px-3 py-2">
              <span className="text-xs uppercase tracking-[0.22em] text-taupe">
                {t.nav.langLabel}
              </span>
              <LanguageToggle />
            </div>
            <button
              onClick={() => {
                setOpen(false)
                onFindUs()
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper"
            >
              <Navigation className="h-4 w-4" /> {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ onSeeMenu, onFindUs }) {
  const { t } = useLang()
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
            {t.hero.pill}
          </span>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] leading-[1.02] tracking-tightest text-ink text-balance max-w-5xl animate-subtle-rise"
            style={{ animationDelay: '80ms' }}
          >
            {t.hero.title[0]}
            <br className="hidden sm:block" />{' '}
            <span className="text-taupe">{t.hero.title[1]}</span>
          </h1>

          <p
            className="max-w-2xl text-lg sm:text-xl leading-relaxed text-umber/85 text-pretty animate-subtle-rise"
            style={{ animationDelay: '160ms' }}
          >
            {t.hero.subtitle}
          </p>

          <div
            className="flex flex-wrap items-center gap-4 animate-subtle-rise"
            style={{ animationDelay: '240ms' }}
          >
            <span className="inline-flex items-center gap-3 rounded-full bg-ink text-paper pl-5 pr-5 py-2.5 shadow-[0_18px_40px_-18px_rgba(26,22,16,0.35)]">
              <span className="text-sm font-semibold tracking-wide">
                {t.hero.single}
              </span>
              <span className="h-4 w-px bg-paper/20" />
              <span className="text-sm font-semibold tracking-wide">
                {t.hero.deal}
              </span>
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
              {t.hero.seeMenu}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-fluid group-hover:translate-x-1" />
            </button>
            <button
              onClick={onFindUs}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper/60 backdrop-blur px-7 py-3.5 text-sm font-medium text-ink transition-[transform,border-color,background-color] duration-500 ease-fluid hover:-translate-y-0.5 hover:border-ink/30 hover:bg-paper/90"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.8} />
              {t.hero.findUs}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlavorCard({ flavor, onOpen, index }) {
  const { t } = useLang()

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
          {t.menu.chip}
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
        <p className={`mt-1 text-sm font-medium ${flavor.accent}`}>
          {flavor.english}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-umber/85">
          {flavor.tagline}
        </p>
      </div>

      <div className="relative mt-auto pt-10 flex items-end justify-between text-xs text-taupe">
        <span className="inline-flex items-center gap-1.5">
          <span className={`h-1 w-1 rounded-full ${flavor.dot}`} />
          {flavor.calories} kcal · {t.menu.perBar}
        </span>
        <span className="font-medium text-ink">{t.menu.viewDetails}</span>
      </div>
    </button>
  )
}

function MenuSection({ flavors, onOpenFlavor }) {
  const { t } = useLang()
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
              {t.menu.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
              {t.menu.title[0]}
              <br className="hidden sm:block" />{' '}
              <span className="text-taupe">{t.menu.title[1]}</span>
            </h2>
          </div>
          <p className="max-w-md text-umber/85 leading-relaxed">{t.menu.blurb}</p>
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

function NoteSection() {
  const { t } = useLang()
  const ref = useReveal()
  if (!t.note) return null

  return (
    <section className="relative py-20 lg:py-28 bg-paper">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[58rem] rounded-full bg-rose-200/25 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div ref={ref} className="reveal relative">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-taupe">
            {t.note.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tightest text-ink text-balance">
            {t.note.title}
          </h2>
          <p className="mt-7 text-lg sm:text-xl text-umber leading-relaxed text-pretty">
            {t.note.body}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-12 bg-ink/25" />
            <span className="font-display italic text-sm text-taupe">
              {t.note.sign}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlavorModal({ flavor, onClose, onAdd }) {
  const { t } = useLang()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  useEscapeKey(onClose, !!flavor)
  useLockBodyScroll(!!flavor)

  useEffect(() => {
    setQty(1)
    setJustAdded(false)
  }, [flavor?.id])

  useEffect(() => {
    if (!justAdded) return
    const timer = setTimeout(() => setJustAdded(false), 1400)
    return () => clearTimeout(timer)
  }, [justAdded])

  if (!flavor) return null

  const handleAdd = () => {
    onAdd(flavor.id, qty)
    setJustAdded(true)
  }

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
        className="relative w-full sm:max-w-2xl bg-cream sm:rounded-3xl rounded-t-3xl shadow-[0_40px_80px_-20px_rgba(26,22,16,0.35)] border border-ink/[0.06] overflow-hidden animate-scale-in flex flex-col max-h-[92vh] sm:max-h-[88vh]"
      >
        <div className="relative h-32 sm:h-40 overflow-hidden shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${flavor.modalWash}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cream" />
          <div className="absolute inset-0 paper-grain opacity-50" />
          <button
            onClick={onClose}
            aria-label={t.modal.close}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/80 backdrop-blur border border-ink/10 text-ink shadow-sm transition-[background-color,color,transform] duration-500 ease-fluid hover:bg-ink hover:text-paper hover:rotate-90"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-4 left-6 sm:left-8 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full bg-paper/80 border border-ink/[0.06] px-3 py-1 text-[11px] font-medium tracking-wide uppercase ${flavor.accent}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${flavor.dot}`} />
              {t.menu.chip}
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-6 sm:py-8 overflow-y-auto flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                id="flavor-modal-title"
                className="font-display text-3xl sm:text-4xl tracking-tightest text-ink leading-tight"
              >
                {flavor.name}
              </h3>
              <p className={`mt-1 text-sm font-medium ${flavor.accent}`}>
                {flavor.english}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display text-3xl tracking-tightest text-ink">
                {flavor.calories}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-taupe mt-0.5">
                {t.modal.kcalBar}
              </div>
            </div>
          </div>

          <p className="mt-5 text-umber leading-relaxed">{flavor.description}</p>

          <div className="mt-8">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
              {t.modal.ingredients}
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
              {t.modal.allergens}
            </div>
            <p className="mt-1.5 text-sm text-umber leading-relaxed">
              {t.modal.allergenNote}
            </p>
          </div>
        </div>

        <div className="shrink-0 border-t border-ink/[0.07] bg-cream px-6 sm:px-8 py-4 sm:py-5 flex items-center gap-3">
          <QuantityStepper value={qty} onChange={setQty} />
          <button
            onClick={handleAdd}
            className={`group flex-1 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-[transform,background-color,box-shadow,color] duration-500 ease-fluid hover:-translate-y-0.5 hover:shadow-lg ${
              justAdded
                ? 'bg-emerald-600 text-paper'
                : 'bg-ink text-paper hover:bg-[#23200E]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.4} />
                {t.modal.added} · {fmt(qty * SINGLE_PRICE)}
              </>
            ) : (
              <>
                {t.modal.add}
                <span className="opacity-70">·</span>
                <span className="tabular-nums">{fmt(qty * SINGLE_PRICE)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function LocationSection() {
  const { t } = useLang()
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
              {t.location.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
              {t.location.title[0]}
              <span className="text-taupe"> {t.location.title[1]}</span>
            </h2>
          </div>
          <p className="max-w-md text-umber/85 leading-relaxed">
            {t.location.blurb}
          </p>
        </div>

        <div ref={cardsRef} className="stagger grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div
            style={{ '--i': 0 }}
            className="lg:col-span-3 rounded-3xl border border-ink/[0.07] bg-cream p-7 sm:p-10 shadow-[0_1px_0_rgba(26,22,16,0.03)] relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
                {t.location.stand}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border border-emerald-300/50">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 animate-pulse-dot" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                </span>
                {t.location.openNow}
              </span>
            </div>

            <div className="relative mt-8">
              <div className="text-[11px] uppercase tracking-[0.22em] text-taupe">
                {t.location.openSummer}
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
                {t.location.openMaps}
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
                {t.location.copyAddress}
              </a>
            </div>
          </div>

          <div
            style={{ '--i': 1 }}
            className="lg:col-span-2 rounded-3xl border border-ink/[0.07] bg-cream p-7 sm:p-10 shadow-[0_1px_0_rgba(26,22,16,0.03)] flex flex-col"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
              {t.location.hours}
            </span>

            <div className="mt-6 flex items-start gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-paper border border-ink/[0.07] text-ink shrink-0">
                <Clock className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-display text-3xl sm:text-[2rem] leading-tight tracking-tight text-ink">
                  {t.location.hoursValue}
                </p>
                <p className="mt-1 text-umber/85 inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-taupe" strokeWidth={1.8} />
                  {t.location.everyDay}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-8 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-ink/[0.07] bg-paper px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-taupe inline-flex items-center gap-1.5">
                  <CreditCard className="h-3 w-3" strokeWidth={1.8} />
                  {t.location.card}
                </div>
                <div className="mt-1.5 font-medium text-ink">
                  {t.location.cardValue}
                </div>
              </div>
              <div className="rounded-2xl border border-ink/[0.07] bg-paper px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-taupe inline-flex items-center gap-1.5">
                  <Wallet className="h-3 w-3" strokeWidth={1.8} />
                  {t.location.cash}
                </div>
                <div className="mt-1.5 font-medium text-ink">
                  {t.location.cashValue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhilosophySection({ pillars }) {
  const { t } = useLang()
  const headerRef = useReveal()
  const gridRef = useReveal({ threshold: 0.1 })

  return (
    <section id="philosophy" className="relative py-24 lg:py-32 bg-paper">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div ref={headerRef} className="reveal max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-[0.22em] text-taupe">
            {t.philosophy.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.03] tracking-tightest text-ink text-balance">
            {t.philosophy.title}
          </h2>
          <p className="mt-6 text-umber/85 leading-relaxed max-w-2xl">
            {t.philosophy.blurb}
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

// ---- Cart & Checkout ----

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

function CartDrawer({ open, onClose, items, onUpdate, onRemove, onCheckout, onSeeMenu }) {
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

function CheckoutModal({ open, onClose, items, onComplete }) {
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

function Footer() {
  const { t } = useLang()

  return (
    <footer className="relative bg-ink text-paper">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-paper/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="font-display text-4xl sm:text-5xl tracking-tightest">
              Elyra
            </div>
            <p className="mt-3 text-paper/70 text-sm tracking-wide">
              {t.footer.tagline}
            </p>
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
          <div>
            © {new Date().getFullYear()} Elyra Paletas. {t.footer.rights}
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#menu"
              className="transition-colors duration-300 hover:text-paper"
            >
              {t.nav.menu}
            </a>
            <a
              href="#location"
              className="transition-colors duration-300 hover:text-paper"
            >
              {t.nav.findUs}
            </a>
            <a
              href="#philosophy"
              className="transition-colors duration-300 hover:text-paper"
            >
              {t.nav.philosophy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ---- App ----

export default function App() {
  const [activeFlavorId, setActiveFlavorId] = useState(null)
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return null
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'en' || saved === 'es' ? saved : null
  })
  const [showPicker, setShowPicker] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return !(saved === 'en' || saved === 'es')
  })

  useEffect(() => {
    document.documentElement.lang = lang || 'en'
  }, [lang])

  const setLang = (next) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* swallow */
    }
  }

  const handlePickerChoice = (chosen, remember) => {
    setLangState(chosen)
    setShowPicker(false)
    if (remember) {
      try {
        window.localStorage.setItem(STORAGE_KEY, chosen)
      } catch {
        /* swallow */
      }
    }
  }

  const activeLang = lang || 'en'
  const t = COPY[activeLang]

  const flavors = useMemo(
    () => FLAVORS.map((f) => ({ ...f, ...f.copy[activeLang] })),
    [activeLang],
  )
  const pillars = PILLARS[activeLang]

  const activeFlavor =
    activeFlavorId == null ? null : flavors.find((f) => f.id === activeFlavorId)

  const cartItems = useMemo(
    () =>
      cart
        .map((line) => {
          const flavor = flavors.find((f) => f.id === line.id)
          return flavor ? { id: line.id, qty: line.qty, flavor } : null
        })
        .filter(Boolean),
    [cart, flavors],
  )

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)

  const addToCart = (id, qty) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.id === id)
      if (existing) {
        return prev.map((line) =>
          line.id === id ? { ...line, qty: line.qty + qty } : line,
        )
      }
      return [...prev, { id, qty }]
    })
    setCartOpen(true)
  }

  const updateQty = (id, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((line) => line.id !== id)
        : prev.map((line) => (line.id === id ? { ...line, qty } : line)),
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((line) => line.id !== id))
  }

  const scrollToLocation = () => {
    const el = document.getElementById('location')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const scrollToMenu = () => {
    const el = document.getElementById('menu')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCheckout = () => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  const handleCheckoutComplete = () => {
    setCheckoutOpen(false)
    setCart([])
  }

  return (
    <LangContext.Provider value={{ lang: activeLang, t, setLang }}>
      <div className="min-h-screen bg-paper text-ink antialiased">
        <NavBar
          onFindUs={scrollToLocation}
          cartCount={cartCount}
          onOpenCart={() => setCartOpen(true)}
        />
        <main>
          <Hero onSeeMenu={scrollToMenu} onFindUs={scrollToLocation} />
          <MenuSection
            flavors={flavors}
            onOpenFlavor={(f) => setActiveFlavorId(f.id)}
          />
          <NoteSection />
          <LocationSection />
          <PhilosophySection pillars={pillars} />
        </main>
        <Footer />

        <FlavorModal
          flavor={activeFlavor}
          onClose={() => setActiveFlavorId(null)}
          onAdd={addToCart}
        />

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdate={updateQty}
          onRemove={removeFromCart}
          onCheckout={handleCheckout}
          onSeeMenu={scrollToMenu}
        />

        <CheckoutModal
          open={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          items={cartItems}
          onComplete={handleCheckoutComplete}
        />

        {showPicker && <LanguagePicker onChoose={handlePickerChoice} />}
      </div>
    </LangContext.Provider>
  )
}

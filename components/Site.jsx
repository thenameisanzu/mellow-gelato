'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Instagram, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Heart,
  ShoppingBag
} from 'lucide-react'

// ---- Shop Configuration & Content ----
const SHOP = {
  whatsapp: '919876543210',
  phoneDisplay: '+91 98765 43210',
  address: 'Shop 4, Beach Road, Fort Kochi, Kerala 682001',
  hours: '12 pm to 11 pm, every day',
  insta: '@mellow.gelato',
  instaUrl: 'https://instagram.com/mellow.gelato',
  mapsUrl: 'https://maps.google.com/?q=Mellow+Gelato+Fort+Kochi',
  fssai: '11324007000318'
}

const FLAVOURS = [
  {
    name: 'Salted Pistachio',
    note: 'Roasted Sicilian pistachios, ground cardamom & Maldon sea salt crystals',
    bg: '#BFEBD3',
    dark: false,
    image: '/images/pistachio.jpg',
    tag: 'Bestseller',
    scoopPrice: '₹180',
    tubPrice: '₹520'
  },
  {
    name: 'Tender Coconut',
    note: 'Fresh Kerala coconut cream slow-churned with tender coconut malai pulp',
    bg: '#FFFFFF',
    dark: false,
    image: '/images/coconut.jpg',
    tag: 'Kerala Special',
    scoopPrice: '₹160',
    tubPrice: '₹490'
  },
  {
    name: 'Alphonso Mango',
    note: 'Seasonal sun-ripened Ratnagiri mango sorbet, naturally sweet & dairy-free',
    bg: '#FFD84D',
    dark: false,
    image: '/images/mango.jpg',
    tag: 'Dairy-Free Sorbet',
    scoopPrice: '₹160',
    tubPrice: '₹490'
  },
  {
    name: 'Dark Chocolate',
    note: '70% single-origin Belgian cocoa infused with a gentle pinch of sea salt',
    bg: '#4A2A1E',
    dark: true,
    image: '/images/chocolate.jpg',
    tag: 'Rich & Decadent',
    scoopPrice: '₹170',
    tubPrice: '₹510'
  },
  {
    name: 'Jaggery Fig',
    note: 'Slow-caramelized brown figs simmered with authentic Kerala Marayoor jaggery',
    bg: '#FFB8A8',
    dark: false,
    image: '/images/fig.jpg',
    tag: 'Chef Signature',
    scoopPrice: '₹170',
    tubPrice: '₹510'
  }
]

const PRICING_TIERS = [
  {
    title: 'Artisan Scoops',
    subtitle: 'Served in a waffle cone or compostable cup',
    badge: 'Daily Churn',
    items: [
      { name: 'Single Scoop', desc: '100g • Pick any 1 flavour', price: '₹160' },
      { name: 'Double Scoop', desc: '180g • Combine any 2 flavours', price: '₹280' },
      { name: 'Triple Flight', desc: '260g • Taste 3 flavours', price: '₹380' },
      { name: 'Fresh Waffle Cone', desc: 'Hand-rolled butter cinnamon cone', price: '+₹30' }
    ],
    highlight: false
  },
  {
    title: 'Take-Home Tubs',
    subtitle: 'Insulated thermal foil pack included (stays cold 45 mins)',
    badge: 'Popular for Pre-order',
    items: [
      { name: 'Pint Tub (500ml)', desc: 'Serves 2-3 • Pick up to 2 flavours', price: '₹490' },
      { name: 'Party Tub (1000ml)', desc: 'Serves 5-6 • Pick up to 3 flavours', price: '₹890' },
      { name: 'Pistachio / Special Pint', desc: 'Single-origin premium edition', price: '₹520' }
    ],
    highlight: true,
    cta: 'Pre-order Tub on WhatsApp'
  },
  {
    title: 'Specialties & Shakes',
    subtitle: 'Crafted freshly to order at the parlour',
    badge: 'House Specials',
    items: [
      { name: 'Mellow Affogato', desc: 'Double espresso poured over tender coconut gelato', price: '₹210' },
      { name: 'Gelato Thickshake', desc: 'Two big scoops blended with cold whole milk', price: '₹260' },
      { name: 'Toasted Brioche Bun', desc: 'Warm buttery brioche stuffed with cold gelato', price: '₹240' }
    ],
    highlight: false
  }
]

const LINKS = [
  ['top', 'Home'],
  ['flavours', 'Flavours'],
  ['pricing', 'Pricing & Menu'],
  ['visit', 'Visit']
]

const wa = (t) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(t)}`
const pop = (i) => ({
  initial: { scale: 0.7, opacity: 0, rotate: i % 2 ? 4 : -4 },
  animate: { scale: 1, opacity: 1, rotate: 0 },
  transition: { type: 'spring', stiffness: 220, damping: 16, delay: 0.1 + i * 0.09 }
})

function Scoop() {
  return (
    <motion.svg
      viewBox="0 0 100 140"
      className="absolute -bottom-2 right-2 w-[46%] max-w-[240px] pointer-events-none select-none"
      animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden
    >
      <polygon points="24,68 76,68 50,136" fill="#FFD84D" stroke="#2A1240" strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 80L58 108M50 76L64 98M30 92L42 108" stroke="#2A1240" strokeWidth="1.5" opacity=".5" />
      <path
        d="M18 56C14 24 36 8 54 12C76 14 90 34 82 58C82 70 70 72 66 66C62 76 52 76 50 66C46 74 34 74 32 64C26 68 18 66 18 56Z"
        fill="#FFB8A8"
        stroke="#2A1240"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="66" cy="12" r="6" fill="#2A1240" />
    </motion.svg>
  )
}

function Deck() {
  const [order, setOrder] = useState(FLAVOURS.map((_, i) => i))
  const next = () => setOrder((o) => [...o.slice(1), o[0]])
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])
  const top = FLAVOURS[order[0]]

  return (
    <div className="mx-auto max-w-md">
      {/* Visual Indicator of count */}
      <div className="mb-4 flex items-center justify-between px-2 text-xs font-semibold tracking-wider uppercase text-plum/70">
        <span>Flavour {order[0] + 1} of {FLAVOURS.length}</span>
        <div className="flex gap-1.5">
          {FLAVOURS.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                order[0] === idx ? 'w-6 bg-plum' : 'w-2 bg-plum/25'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-[490px]">
        {order.slice(0, 3).map((idx, pos) => {
          const item = FLAVOURS[idx]
          return (
            <motion.div
              key={idx}
              drag={pos === 0 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) next()
                else if (info.offset.x > 70) prev()
              }}
              animate={{
                scale: 1 - pos * 0.05,
                y: pos * 18,
                rotate: pos === 0 ? 0 : pos % 2 ? 3 : -3
              }}
              style={{ zIndex: 3 - pos, background: item.bg }}
              className={`absolute inset-0 flex cursor-grab flex-col justify-between rounded-[36px] border-[3px] border-plum p-6 shadow-md active:cursor-grabbing ${
                item.dark ? 'text-white' : 'text-plum'
              }`}
            >
              {/* Flavour Real Image */}
              <div className="relative h-56 w-full overflow-hidden rounded-[26px] border-2 border-plum/30 shadow-inner">
                <Image
                  src={item.image}
                  alt={`${item.name} gelato`}
                  fill
                  sizes="(max-width: 640px) 100vw, 420px"
                  className="object-cover"
                  priority={pos === 0}
                />
                <span className="absolute top-3 right-3 rounded-full border border-plum/20 bg-white/95 px-3 py-1 text-xs font-bold text-plum shadow-sm backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              {/* Text & Price Info */}
              <div className="mt-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-3xl md:text-4xl leading-none">{item.name}</h3>
                  <span className="shrink-0 rounded-full bg-plum/15 px-3 py-1 font-display text-lg">
                    {item.scoopPrice}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-snug opacity-85">{item.note}</p>
                <div className="mt-3 flex items-center justify-between border-t border-plum/20 pt-2 text-xs font-semibold">
                  <span className="opacity-80">Take-home 500ml tub</span>
                  <span>{item.tubPrice}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mt-8 flex items-center gap-2">
        <button
          onClick={prev}
          aria-label="Previous flavour"
          className="rounded-full border-[3px] border-plum bg-white/80 p-4 font-semibold transition-transform hover:scale-105 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full border-[3px] border-plum bg-white/80 py-4 font-semibold transition-transform hover:scale-105 active:scale-95"
        >
          <span>Next flavour</span>
          <ChevronRight size={18} />
        </button>
        <a
          href={wa(`Hi Mellow, I'd like to order ${top.name} gelato (${top.scoopPrice} scoop / ${top.tubPrice} tub).`)}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-plum py-4 text-center font-semibold text-butter transition-transform hover:scale-105 active:scale-95"
        >
          <ShoppingBag size={18} />
          <span>Order {top.name.split(' ')[0]}</span>
        </a>
      </div>
    </div>
  )
}

export default function Site() {
  const [open, setOpen] = useState(false)
  const go = (id) => {
    setOpen(false)
    setTimeout(() => {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 350)
  }

  const tile = 'rounded-[32px] border-[3px] border-plum p-5'
  const origin = 'calc(100% - 44px) calc(100% - 44px)'

  return (
    <MotionConfig reducedMotion="user">
      {/* Original Floating Top Header Badge */}
      <header id="top" className="sticky top-0 z-30 mx-auto flex max-w-6xl justify-center px-4 pt-4">
        <a href="#top" className="rounded-full border-[3px] border-plum bg-butter px-6 py-2 font-display text-xl transition-transform hover:scale-105">
          Mellow
        </a>
      </header>

      <main className="pb-20 pt-4">
        {/* Top Hero Container */}
        <div className="mx-auto max-w-6xl px-4">
          {/* Hero Bento Grid */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <motion.div
              {...pop(0)}
              className={`${tile} relative col-span-2 row-span-2 min-h-[360px] overflow-hidden bg-tomato text-butter md:min-h-[460px]`}
            >
              <h1 className="font-display text-[15vw] leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-[6.5rem]">
                Mellow
              </h1>
              <p className="mt-4 max-w-[12rem] text-lg font-medium text-white">
                Small-batch gelato, made fresh every morning.
              </p>
              <Scoop />
            </motion.div>

            <motion.div {...pop(1)} className={`${tile} bg-butter flex flex-col justify-between`}>
              <Clock size={28} />
              <p className="mt-6 text-lg font-semibold leading-tight">{SHOP.hours}</p>
            </motion.div>

            {/* Shop Photo Bento Card */}
            <motion.div
              {...pop(2)}
              whileTap={{ rotate: -3, scale: 0.96 }}
              className={`${tile} relative min-h-[160px] overflow-hidden p-0 border-plum group shadow-sm`}
            >
              <Image
                src="/images/shop.jpg"
                alt="Mellow Gelato Parlour in Kerala"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plum/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs font-bold uppercase tracking-wider text-butter bg-plum/80 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  Our Parlour
                </span>
              </div>
            </motion.div>

            <motion.div {...pop(3)} className={`${tile} col-span-2 bg-plum text-lilac flex items-center`}>
              <p className="font-display text-3xl md:text-4xl leading-tight">
                Twelve flavours. Churned before we open.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Marquee Banner - Edge-to-edge full viewport width */}
        <div className="my-12 w-full overflow-hidden border-y-[3px] border-plum bg-mint py-3.5 shadow-inner">
          <motion.div
            className="flex w-max gap-8 whitespace-nowrap font-display text-2xl md:text-3xl"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            {[...FLAVOURS, ...FLAVOURS, ...FLAVOURS, ...FLAVOURS, ...FLAVOURS, ...FLAVOURS].map((item, i) => (
              <span key={i} className="flex items-center gap-3">
                <span>{item.name}</span>
                <span className="text-tomato">•</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Sections Container */}
        <div className="mx-auto max-w-6xl px-4">
          {/* Flavours Section */}
          <section id="flavours" className="scroll-mt-20 py-8">
            <div className="mb-8 text-center">
              <h2 className="font-display text-5xl md:text-7xl">Pick a flavour</h2>
              <p className="mt-2 text-lg text-plum/80">Swipe left or right, or use the buttons below to browse.</p>
            </div>
            <Deck />
          </section>

        {/* Pricing & Menu Section */}
        <section id="pricing" className="scroll-mt-20 pt-16">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border-[2.5px] border-plum bg-butter px-4 py-1 text-sm font-semibold text-plum">
              <Sparkles size={16} /> Honest & Transparent Pricing
            </span>
            <h2 className="mt-3 font-display text-5xl md:text-7xl">Menu & Pricing</h2>
            <p className="mx-auto mt-2 max-w-xl text-lg text-plum/85">
              100% vegetarian, slow-churned daily with fresh farm milk, seasonal fruit and zero artificial emulsifiers.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PRICING_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={`${tile} flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  tier.highlight ? 'bg-butter shadow-md md:-translate-y-2' : 'bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-plum/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-plum">
                      {tier.badge}
                    </span>
                    {tier.highlight && (
                      <span className="rounded-full bg-plum px-3 py-1 text-xs font-bold text-butter">
                        Top Pick
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-3xl">{tier.title}</h3>
                  <p className="mt-1 text-sm text-plum/70">{tier.subtitle}</p>

                  <div className="mt-6 space-y-4">
                    {tier.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="border-b border-plum/15 pb-3 last:border-0 last:pb-0">
                        <div className="flex items-baseline justify-between">
                          <span className="font-semibold text-base">{item.name}</span>
                          <span className="font-display text-lg text-plum">{item.price}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-plum/75">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  {tier.highlight ? (
                    <a
                      href={wa('Hi Mellow! I would like to pre-order a gelato tub for takeaway.')}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full rounded-full bg-plum py-3.5 text-center font-semibold text-butter transition-transform hover:scale-102"
                    >
                      {tier.cta}
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-medium text-plum/70">
                      <CheckCircle2 size={16} className="text-tomato" />
                      <span>Available daily for dine-in & takeaway</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visit & Pre-order Section */}
        <section id="visit" className="scroll-mt-20 pt-20">
          <div className="grid gap-4 md:grid-cols-3">
            <div className={`${tile} bg-white md:col-span-2 flex flex-col justify-between`}>
              <div>
                <h2 className="font-display text-5xl md:text-6xl">Find us</h2>
                <p className="mt-4 flex items-start gap-2.5 text-xl font-medium">
                  <MapPin className="mt-1 shrink-0 text-tomato" size={24} />
                  <span>{SHOP.address}</span>
                </p>
                <p className="mt-3 flex items-center gap-2.5 text-base text-plum/80">
                  <Clock className="shrink-0 text-tomato" size={18} />
                  <span>Open today: {SHOP.hours}</span>
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={SHOP.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-plum px-7 py-4 font-semibold text-butter transition-transform hover:scale-105"
                >
                  Open in Google Maps
                </a>
                <a
                  href={`tel:${SHOP.whatsapp}`}
                  className="rounded-full border-[3px] border-plum px-6 py-4 font-semibold transition-transform hover:scale-105"
                >
                  Call Parlour
                </a>
              </div>
            </div>

            <div className={`${tile} bg-blush flex flex-col justify-between`}>
              <div>
                <p className="font-display text-3xl">Pre-order a tub</p>
                <p className="mt-2 text-sm leading-relaxed">
                  Tell us your favourite flavours, and we will pack it in an insulated thermal pouch ready in 30 minutes!
                </p>
              </div>
              <div className="mt-6">
                <a
                  href={wa('Hi Mellow, I want to pre-order a tub of gelato.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block w-full rounded-full border-[3px] border-plum bg-butter py-3.5 text-center font-semibold transition-transform hover:scale-102"
                >
                  WhatsApp us
                </a>
                <a
                  href={SHOP.instaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold hover:underline"
                >
                  <Instagram size={16} />
                  <span>{SHOP.insta}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

      {/* Comprehensive Brand Footer */}
      <footer className="border-t-[3px] border-plum bg-plum text-lilac">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand column */}
            <div className="md:col-span-1">
              <div className="inline-block rounded-full bg-butter px-5 py-1.5 font-display text-2xl text-plum">
                Mellow
              </div>
              <p className="mt-4 text-sm leading-relaxed text-lilac/80">
                Small-batch artisanal gelato churned fresh every morning in Kerala. Pure ingredients, slow craft, and no shortcuts.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-semibold text-butter">
                <ShieldCheck size={18} />
                <span>FSSAI Lic: {SHOP.fssai}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-xl text-butter">Quick Navigation</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {LINKS.map(([id, label]) => (
                  <li key={id}>
                    <button
                      onClick={() => go(id)}
                      className="text-lilac/80 transition-colors hover:text-butter hover:underline"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit & Timings */}
            <div>
              <h4 className="font-display text-xl text-butter">Visit Us</h4>
              <div className="mt-4 space-y-3 text-sm text-lilac/80">
                <p className="flex items-start gap-2">
                  <Clock size={16} className="mt-0.5 shrink-0 text-butter" />
                  <span>{SHOP.hours}</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-butter" />
                  <span>{SHOP.address}</span>
                </p>
              </div>
            </div>

            {/* Connect & Orders */}
            <div>
              <h4 className="font-display text-xl text-butter">Connect & Order</h4>
              <p className="mt-4 text-sm text-lilac/80">
                Pre-orders, party catering tubs, or daily churn enquiries:
              </p>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <a
                  href={wa('Hi Mellow!')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-semibold text-butter transition-colors hover:text-white"
                >
                  <Phone size={16} />
                  <span>{SHOP.phoneDisplay}</span>
                </a>
                <a
                  href={SHOP.instaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-semibold text-butter transition-colors hover:text-white"
                >
                  <Instagram size={16} />
                  <span>{SHOP.insta}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-lilac/15 pt-8 text-xs text-lilac/60 md:flex-row">
            <p>© {new Date().getFullYear()} Mellow Gelato. All rights reserved. 100% Vegetarian.</p>
            <p className="flex items-center gap-1.5">
              <span>Handcrafted with</span>
              <Heart size={14} className="fill-tomato text-tomato" />
              <span>in Fort Kochi, Kerala</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button (FAB) Menu Overlay - Kept intact as requested */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: `circle(0px at ${origin})` }}
            animate={{ clipPath: `circle(150% at ${origin})` }}
            exit={{ clipPath: `circle(0px at ${origin})` }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-plum px-8 text-butter"
          >
            {LINKS.map(([id, l], i) => (
              <motion.button
                key={id}
                onClick={() => go(id)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="py-2 text-left font-display text-5xl md:text-7xl hover:text-white transition-colors"
              >
                {l}
              </motion.button>
            ))}
            <a
              href={wa('Hi Mellow! I would like to order gelato.')}
              target="_blank"
              rel="noreferrer"
              className="mt-8 w-max rounded-full bg-tomato px-8 py-4 font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kept Original Floating Menu Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        style={{ bottom: 'max(20px, env(safe-area-inset-bottom))' }}
        className="fixed right-5 z-50 grid h-[68px] w-[68px] place-items-center rounded-full border-[3px] border-plum bg-tomato text-white shadow-xl hover:scale-105 transition-transform"
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </motion.span>
      </motion.button>
    </MotionConfig>
  )
}

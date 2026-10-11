'use client'
import { useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { Menu, X, MapPin, Clock } from 'lucide-react'

// ---- Edit content here ----
const SHOP = { whatsapp: '910000000000', address: 'Street name, Town, Kerala', hours: '12 pm to 11 pm, every day', insta: '@mellow.gelato' }
const FLAVOURS = [
  ['Salted Pistachio', 'Roasted pistachio, cardamom, sea salt', '#BFEBD3'],
  ['Tender Coconut', 'Fresh coconut cream with real pulp', '#FFFFFF'],
  ['Alphonso Mango', 'Seasonal fruit sorbet, dairy free', '#FFD84D'],
  ['Dark Chocolate', 'Seventy percent cocoa and a pinch of salt', '#4A2A1E', true],
  ['Jaggery Fig', 'Slow-cooked figs, Kerala jaggery', '#FFB8A8'],
]
const LINKS = [['top', 'Home'], ['flavours', 'Flavours'], ['visit', 'Visit']]
const wa = (t) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(t)}`
const pop = (i) => ({ initial: { scale: .7, opacity: 0, rotate: i % 2 ? 4 : -4 }, animate: { scale: 1, opacity: 1, rotate: 0 }, transition: { type: 'spring', stiffness: 220, damping: 16, delay: .1 + i * .09 } })

const Ph = ({ label = 'Image placeholder', className = '' }) => (
  <div className={`relative overflow-hidden bg-plum/10 ${className}`}>
    <span className="absolute bottom-3 left-4 text-xs text-plum/50">{label}</span>
  </div>
)

function Scoop() {
  return (
    <motion.svg viewBox="0 0 100 140" className="absolute -bottom-2 right-2 w-[46%] max-w-[240px]" animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} aria-hidden>
      <polygon points="24,68 76,68 50,136" fill="#FFD84D" stroke="#2A1240" strokeWidth="3" strokeLinejoin="round" />
      <path d="M36 80L58 108M50 76L64 98M30 92L42 108" stroke="#2A1240" strokeWidth="1.5" opacity=".5" />
      <path d="M18 56C14 24 36 8 54 12C76 14 90 34 82 58C82 70 70 72 66 66C62 76 52 76 50 66C46 74 34 74 32 64C26 68 18 66 18 56Z" fill="#FFB8A8" stroke="#2A1240" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="66" cy="12" r="6" fill="#2A1240" />
    </motion.svg>
  )
}

function Deck() {
  const [order, setOrder] = useState(FLAVOURS.map((_, i) => i))
  const next = () => setOrder((o) => [...o.slice(1), o[0]])
  const top = FLAVOURS[order[0]]
  return (
    <div className="mx-auto max-w-md">
      <div className="relative h-[430px]">
        {order.slice(0, 3).map((idx, pos) => {
          const [name, note, bg, dark] = FLAVOURS[idx]
          return (
            <motion.div key={idx} drag={pos === 0 ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={.8}
              onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 90) next() }}
              animate={{ scale: 1 - pos * .06, y: pos * 20, rotate: pos === 0 ? 0 : pos % 2 ? 3 : -3 }}
              style={{ zIndex: 3 - pos, background: bg }}
              className={`absolute inset-0 flex cursor-grab flex-col justify-between rounded-[36px] border-[3px] border-plum p-6 active:cursor-grabbing ${dark ? 'text-white' : 'text-plum'}`}>
              <Ph label={`${name} photo`} className="h-52 rounded-3xl bg-white/30" />
              <div><h3 className="font-display text-4xl leading-none">{name}</h3><p className="mt-2 opacity-80">{note}</p></div>
            </motion.div>)
        })}
      </div>
      <div className="mt-10 flex gap-3">
        <button onClick={next} className="flex-1 rounded-full border-[3px] border-plum py-4 font-semibold">Next flavour</button>
        <a href={wa(`Hi Mellow, I'd like to order ${top[0]} gelato.`)} className="flex-1 rounded-full bg-plum py-4 text-center font-semibold text-butter">Order {top[0]}</a>
      </div>
    </div>
  )
}

export default function Site() {
  const [open, setOpen] = useState(false)
  const go = (id) => { setOpen(false); setTimeout(() => (id === 'top' ? window.scrollTo({ top: 0, behavior: 'smooth' }) : document.getElementById(id).scrollIntoView({ behavior: 'smooth' })), 350) }
  const tile = 'rounded-[32px] border-[3px] border-plum p-5'
  const origin = 'calc(100% - 44px) calc(100% - 44px)'

  return (
    <MotionConfig reducedMotion="user">
      <header id="top" className="sticky top-0 z-30 mx-auto flex max-w-6xl justify-center px-4 pt-4">
        <div className="rounded-full border-[3px] border-plum bg-butter px-6 py-2 font-display text-xl">Mellow</div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-32 pt-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <motion.div {...pop(0)} className={`${tile} relative col-span-2 row-span-2 min-h-[360px] overflow-hidden bg-tomato text-butter md:min-h-[460px]`}>
            <h1 className="font-display text-[26vw] leading-[.85] md:text-[9rem]">Mel<br />low</h1>
            <p className="mt-4 max-w-[10rem] text-lg font-medium text-white">Small-batch gelato, made fresh every morning.</p>
            <Scoop />
          </motion.div>
          <motion.div {...pop(1)} className={`${tile} bg-butter`}><Clock /><p className="mt-6 text-lg font-semibold leading-tight">{SHOP.hours}</p></motion.div>
          <motion.div {...pop(2)} whileTap={{ rotate: -3, scale: .96 }}><Ph label="Shop photo" className={`${tile} h-full min-h-[150px] border-plum`} /></motion.div>
          <motion.div {...pop(3)} className={`${tile} col-span-2 bg-plum text-lilac`}><p className="font-display text-3xl leading-tight">Twelve flavours. Churned before we open.</p></motion.div>
        </div>

        <div className="-mx-4 my-10 overflow-hidden border-y-[3px] border-plum bg-mint py-3">
          <motion.div className="flex w-max gap-10 whitespace-nowrap font-display text-3xl" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}>
            {[...FLAVOURS, ...FLAVOURS, ...FLAVOURS, ...FLAVOURS].map(([n], i) => <span key={i}>{n} •</span>)}
          </motion.div>
        </div>

        <section id="flavours" className="scroll-mt-20 py-6">
          <h2 className="mb-2 text-center font-display text-5xl md:text-7xl">Pick a flavour</h2>
          <p className="mb-8 text-center text-lg">Swipe the card away to see the next one.</p>
          <Deck />
        </section>

        <section id="visit" className="scroll-mt-20 pt-16">
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            <div className={`${tile} bg-white md:col-span-2`}>
              <h2 className="font-display text-5xl md:text-7xl">Find us</h2>
              <p className="mt-4 flex items-start gap-2 text-xl"><MapPin className="mt-1 shrink-0" />{SHOP.address}</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Mellow+Gelato" target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-plum px-7 py-4 font-semibold text-butter">Open in Google Maps</a>
            </div>
            <div className={`${tile} bg-blush`}><p className="font-display text-3xl">Pre-order a tub</p><p className="mt-2">Tell us the flavours, pick up in 30 minutes.</p><a href={wa('Hi Mellow, I want to pre-order a tub.')} className="mt-6 inline-block rounded-full border-[3px] border-plum px-6 py-3 font-semibold">WhatsApp us</a><p className="mt-5 text-sm">{SHOP.insta}</p></div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ clipPath: `circle(0px at ${origin})` }} animate={{ clipPath: `circle(150% at ${origin})` }} exit={{ clipPath: `circle(0px at ${origin})` }} transition={{ duration: .6, ease: [.7, 0, .2, 1] }} className="fixed inset-0 z-40 flex flex-col justify-center bg-plum px-8 text-butter">
            {LINKS.map(([id, l], i) => (
              <motion.button key={id} onClick={() => go(id)} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .3 + i * .08 }} className="py-2 text-left font-display text-7xl">{l}</motion.button>))}
            <a href={wa('Hi Mellow!')} className="mt-8 w-max rounded-full bg-tomato px-8 py-4 font-semibold text-white">Order on WhatsApp</a>
          </motion.div>)}
      </AnimatePresence>
      <motion.button whileTap={{ scale: .9 }} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} style={{ bottom: 'max(20px, env(safe-area-inset-bottom))' }} className="fixed right-5 z-50 grid h-[68px] w-[68px] place-items-center rounded-full border-[3px] border-plum bg-tomato text-white">
        <motion.span animate={{ rotate: open ? 90 : 0 }}>{open ? <X size={28} /> : <Menu size={28} />}</motion.span>
      </motion.button>
    </MotionConfig>
  )
}

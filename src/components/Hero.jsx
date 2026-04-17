import { motion } from 'framer-motion'
import { ArrowDown, Leaf } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function FloatingParticle({ delay, size, left, duration }) {
  return (
    <motion.div
      initial={{ y: '110vh', opacity: 0 }}
      animate={{ y: '-10vh', opacity: [0, 0.6, 0.6, 0] }}
      transition={{ duration: duration || 12, repeat: Infinity, delay: delay || 0, ease: 'linear' }}
      className="absolute rounded-full pointer-events-none bg-emerald-400/20 blur-sm"
      style={{ left: `${left}%`, width: size, height: size }}
    />
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const particles = [
    { delay: 0, size: 6, left: 10, duration: 14 },
    { delay: 2, size: 8, left: 25, duration: 16 },
    { delay: 4, size: 4, left: 40, duration: 12 },
    { delay: 1, size: 10, left: 55, duration: 18 },
    { delay: 5, size: 5, left: 70, duration: 13 },
    { delay: 3, size: 7, left: 85, duration: 15 },
    { delay: 6, size: 4, left: 15, duration: 11 },
    { delay: 8, size: 6, left: 90, duration: 14 },
  ]

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden text-center bg-slate-950">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-teal-500/15 blur-[100px]" />
        {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium border rounded-full backdrop-blur-sm bg-emerald-500/10 border-emerald-400/20 text-emerald-300">
          <Leaf className="w-4 h-4" />
          <span>{t.hero.badge}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          {t.hero.title1}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">{t.hero.title2}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">{t.hero.subtitle}</motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
          <a href="#calculator" className="group relative px-8 py-3.5 text-base font-semibold text-white transition-all rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.35)] hover:scale-105 active:scale-95">
            <span className="relative z-10">{t.hero.cta1}</span>
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="#features" className="px-8 py-3.5 text-base font-semibold transition-all border rounded-full text-slate-200 border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 hover:border-slate-500 hover:scale-105 active:scale-95">
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>

      <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
        href="#problem" className="absolute z-10 flex flex-col items-center gap-2 text-sm font-medium transition-colors bottom-10 text-slate-500 hover:text-emerald-400">
        {t.hero.scroll}<ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  )
}

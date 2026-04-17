import { motion } from 'framer-motion'
import { TrendingDown, TreePine, Wind } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const icons = [TrendingDown, TreePine, Wind]

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } } }

export default function Impact() {
  const { t } = useLanguage()
  const impacts = [
    { icon: icons[0], value: '50K+', unit: 'tons', label: t.impact.impact1 },
    { icon: icons[1], value: '100K+', unit: 'trees', label: t.impact.impact2 },
    { icon: icons[2], value: '10+', unit: 'MW', label: t.impact.impact3 },
  ]

  return (
    <section id="impact" className="relative px-6 py-28 overflow-hidden bg-slate-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.impact.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mt-4 text-lg text-slate-300">{t.impact.subtitle}</motion.p>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-3">
          {impacts.map((itemData) => (
            <motion.div key={itemData.label} variants={item} whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative p-8 border rounded-2xl bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] group overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <itemData.icon className="w-10 h-10 mx-auto text-emerald-400 group-hover:scale-110 transition-transform" />
              <div className="mt-5 text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                {itemData.value}<span className="ml-1 text-xl font-medium text-emerald-400">{itemData.unit}</span>
              </div>
              <div className="mt-2 text-sm text-slate-400">{itemData.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

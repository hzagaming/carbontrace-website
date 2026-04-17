import { motion } from 'framer-motion'
import { CreditCard, BarChart3, TreeDeciduous, Target } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const icons = [CreditCard, BarChart3, TreeDeciduous, Target]

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }

export default function Features() {
  const { t } = useLanguage()
  const features = [
    { icon: icons[0], title: t.features.feat1Title, description: t.features.feat1Desc },
    { icon: icons[1], title: t.features.feat2Title, description: t.features.feat2Desc },
    { icon: icons[2], title: t.features.feat3Title, description: t.features.feat3Desc },
    { icon: icons[3], title: t.features.feat4Title, description: t.features.feat4Desc },
  ]

  return (
    <section id="features" className="px-6 py-28 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.features.title}</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-300">{t.features.subtitle}</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-6 mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item} whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="relative p-6 border rounded-2xl bg-slate-900/40 border-slate-800 backdrop-blur-sm hover:border-emerald-500/30 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)] group overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all">
                <feature.icon className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

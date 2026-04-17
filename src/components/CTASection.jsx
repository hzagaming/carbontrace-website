import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function CTASection() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setEmail('') }, 3000)
  }

  return (
    <section className="relative px-6 py-24 overflow-hidden bg-slate-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.cta.title}</motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-slate-300">{t.cta.subtitle}</motion.p>

        <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <div className="relative w-full sm:w-auto sm:min-w-[320px]">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.cta.placeholder}
              className="w-full px-5 py-3.5 text-sm bg-slate-900 border rounded-full border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all" />
          </div>
          <button type="submit" disabled={submitted}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all active:scale-95 ${
              submitted ? 'bg-emerald-600' : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]'
            }`}>
            {submitted ? (
              <><CheckCircle2 className="w-4 h-4" /><span>{t.cta.subscribed}</span></>
            ) : (
              <><span>{t.cta.join}</span><ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </motion.form>
        <p className="mt-4 text-xs text-slate-500">{t.cta.noSpam}</p>
      </div>
    </section>
  )
}

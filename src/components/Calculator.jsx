import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator as CalcIcon, Car, Utensils, Zap, RotateCcw } from 'lucide-react'
import AnimatedNumber from './ui/AnimatedNumber'
import { useLanguage } from '../context/LanguageContext'

const GLOBAL_AVERAGE = 4.5

function CustomRange({ value, min, max, step, onChange, accentClass }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="relative w-full h-6 flex items-center">
      <input type="range" min={min} max={max} step={step} value={value} onChange={onChange}
        className="absolute z-10 w-full h-full opacity-0 cursor-pointer" />
      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-full ${accentClass}`} style={{ width: `${pct}%` }} />
      </div>
      <motion.div className={`absolute w-5 h-5 rounded-full border-2 border-slate-950 shadow-lg ${accentClass}`}
        style={{ left: `calc(${pct}% - 10px)` }} layout transition={{ type: 'spring', stiffness: 300, damping: 25 }} />
    </div>
  )
}

export default function Calculator() {
  const { t, lang } = useLanguage()
  const [transport, setTransport] = useState(150)
  const [diet, setDiet] = useState('average')
  const [electricity, setElectricity] = useState(100)
  const isRtl = lang === 'ar' || lang === 'ur'

  const transportEmissions = useMemo(() => (transport * 52 * 0.12) / 1000, [transport])
  const dietEmissions = useMemo(() => ({ vegan: 1.5, vegetarian: 2.0, average: 2.5, meatHeavy: 3.5 }[diet] || 2.5), [diet])
  const electricityEmissions = useMemo(() => (electricity * 12 * 0.5) / 1000, [electricity])
  const total = transportEmissions + dietEmissions + electricityEmissions

  const reset = () => { setTransport(150); setDiet('average'); setElectricity(100) }

  let comparisonText = '', comparisonTone = ''
  if (total < GLOBAL_AVERAGE * 0.5) { comparisonText = t.calculator.comparisonExcellent; comparisonTone = 'good' }
  else if (total < GLOBAL_AVERAGE) { comparisonText = t.calculator.comparisonGood; comparisonTone = 'good' }
  else if (total < GLOBAL_AVERAGE * 1.5) { comparisonText = t.calculator.comparisonWarn; comparisonTone = 'warn' }
  else { comparisonText = t.calculator.comparisonBad; comparisonTone = 'bad' }

  const toneClasses = {
    good: 'border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.12)]',
    warn: 'border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.12)]',
    bad: 'border-rose-500/40 shadow-[0_0_40px_rgba(244,63,94,0.12)]',
  }
  const barColor = { good: 'bg-emerald-500', warn: 'bg-amber-500', bad: 'bg-rose-500' }
  const gaugePct = Math.min((total / (GLOBAL_AVERAGE * 2)) * 100, 100)

  return (
    <section id="calculator" className="px-6 py-28 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }} className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
            <CalcIcon className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">{t.calculator.title}</h2>
          <p className="max-w-xl mx-auto mt-4 text-lg text-slate-300">{t.calculator.subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.7 }}
          className="grid grid-cols-1 gap-8 mt-14 lg:grid-cols-2">
          <div className="p-8 border rounded-2xl bg-slate-900/40 border-slate-800 backdrop-blur-sm">
            <div className={`flex items-center justify-between mb-8 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="text-sm font-semibold text-white">{t.calculator.lifestyle}</span>
              <button onClick={reset} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors rounded-full text-slate-400 hover:text-white hover:bg-slate-800 ${isRtl ? 'flex-row-reverse' : ''}`} type="button">
                <RotateCcw className="w-3.5 h-3.5" />{t.calculator.reset}
              </button>
            </div>
            <div className="space-y-10">
              <div>
                <div className={`flex items-center justify-between mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <label className={`flex items-center gap-2 text-sm font-semibold text-slate-300 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Car className="w-4 h-4 text-emerald-400" />{t.calculator.transport}
                  </label>
                  <span className="text-sm font-medium text-emerald-400">{transport} km</span>
                </div>
                <CustomRange min={0} max={1000} step={10} value={transport} onChange={(e) => setTransport(Number(e.target.value))} accentClass="bg-emerald-500" />
              </div>
              <div>
                <label className={`flex items-center gap-2 mb-3 text-sm font-semibold text-slate-300 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <Utensils className="w-4 h-4 text-emerald-400" />{t.calculator.diet}
                </label>
                <select value={diet} onChange={(e) => setDiet(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-slate-950 border rounded-lg border-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 hover:border-slate-700 transition-colors">
                  <option value="vegan">{t.calculator.vegan}</option>
                  <option value="vegetarian">{t.calculator.vegetarian}</option>
                  <option value="average">{t.calculator.averageMeat}</option>
                  <option value="meatHeavy">{t.calculator.highMeat}</option>
                </select>
              </div>
              <div>
                <div className={`flex items-center justify-between mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <label className={`flex items-center gap-2 text-sm font-semibold text-slate-300 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Zap className="w-4 h-4 text-emerald-400" />{t.calculator.electricity}
                  </label>
                  <span className="text-sm font-medium text-emerald-400">${electricity}</span>
                </div>
                <CustomRange min={0} max={400} step={5} value={electricity} onChange={(e) => setElectricity(Number(e.target.value))} accentClass="bg-emerald-500" />
              </div>
            </div>
          </div>

          <motion.div key={comparisonTone} initial={{ scale: 0.98, opacity: 0.8 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35 }}
            className={`flex flex-col justify-between p-8 rounded-2xl border-2 bg-slate-900/60 backdrop-blur-sm ${toneClasses[comparisonTone]}`}>
            <div>
              <div className="text-sm font-medium text-slate-400">{t.calculator.footprint}</div>
              <div className="mt-2 text-6xl font-extrabold text-white tracking-tight">
                <AnimatedNumber value={total} decimals={2} /><span className="text-2xl font-semibold text-slate-400 ml-2">t</span>
              </div>
              <div className="mt-1 text-lg text-slate-400">{t.calculator.perYear}</div>
            </div>
            <div className="my-8">
              <div className={`flex justify-between text-xs text-slate-500 mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span>0</span><span>{t.calculator.globalAvg}: {GLOBAL_AVERAGE}t</span><span>9t+</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
                <motion.div className={`h-full ${barColor[comparisonTone]}`} initial={{ width: 0 }} animate={{ width: `${gaugePct}%` }} transition={{ type: 'spring', stiffness: 80, damping: 14 }} />
              </div>
            </div>
            <div>
              <div className={`flex items-baseline gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-medium text-slate-400">{t.calculator.globalAvg}</span>
                <span className="text-xl font-bold text-white">{GLOBAL_AVERAGE} t / year</span>
              </div>
              <div className="mt-4 text-sm font-medium text-white bg-white/5 rounded-lg px-4 py-3 border border-white/10">{comparisonText}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

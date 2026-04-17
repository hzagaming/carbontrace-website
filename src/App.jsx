import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Features from './components/Features'
import Calculator from './components/Calculator'
import Impact from './components/Impact'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import VersionModal from './components/VersionModal'

function App() {
  const [versionOpen, setVersionOpen] = useState(false)

  return (
    <main className="antialiased bg-slate-950">
      <Navbar onOpenVersion={() => setVersionOpen(true)} />
      <Hero />
      <Problem />
      <Features />
      <Calculator />
      <Impact />
      <CTASection />
      <Footer />
      <VersionModal isOpen={versionOpen} onClose={() => setVersionOpen(false)} />
    </main>
  )
}

export default App

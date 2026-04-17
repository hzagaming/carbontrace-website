import { useEffect, useRef } from 'react'
import { useSpring, useTransform, motion } from 'framer-motion'

export default function AnimatedNumber({ value, decimals = 2 }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 })
  const display = useTransform(spring, (current) => current.toFixed(decimals))
  const ref = useRef(null)

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span ref={ref}>{display}</motion.span>
}

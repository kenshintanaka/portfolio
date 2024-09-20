'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'

export const MouseFollower = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const width = useMotionValue(16)
  const height = useMotionValue(16)
  const radius = useMotionValue(9999)
  const shine = useMotionValue(0)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!hoveredElement) {
        cursorX.set(e.clientX)
        cursorY.set(e.clientY)
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        setHoveredElement(target)
      }
    }

    const handleMouseLeave = () => {
      setHoveredElement(null)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseEnter)
    window.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseEnter)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [hoveredElement, cursorX, cursorY])

  useEffect(() => {
    if (hoveredElement) {
      const rect = hoveredElement.getBoundingClientRect()
      width.set(rect.width)
      height.set(rect.height)
      radius.set(parseInt(window.getComputedStyle(hoveredElement).borderRadius) || 0)
      cursorX.set(rect.left + rect.width / 2)
      cursorY.set(rect.top + rect.height / 2)

      // Add shining effect
      animate(shine, 1, {
        duration: 0.3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      })
    } else {
      width.set(16)
      height.set(16)
      radius.set(9999)
      shine.set(0)
    }
  }, [hoveredElement, width, height, radius, cursorX, cursorY, shine])

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        className="absolute border-2 border-primary mix-blend-difference"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          width,
          height,
          borderRadius: radius,
          left: useTransform(width, (w) => -w / 2),
          top: useTransform(height, (h) => -h / 2),
        }}
      />
    </motion.div>
  )
}
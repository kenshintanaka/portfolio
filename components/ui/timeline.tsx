import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function Timeline({ children }: { children: ReactNode }) {
  return <div className="space-y-8">{children}</div>
}

export function TimelineItem({ children }: { children: ReactNode }) {
  return (
    <motion.div 
      className="relative pl-8 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute top-0 left-0 w-6 h-6 bg-primary rounded-full shadow-md flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="w-3 h-3 bg-background rounded-full"></div>
      </motion.div>
      <div className="absolute top-6 left-3 bottom-0 w-[2px] bg-gradient-to-b from-primary to-primary/20"></div>
      {children}
    </motion.div>
  )
}

export function TimelineContent({ children }: { children: ReactNode }) {
  return <div className="bg-card rounded-lg p-4 shadow-sm border border-border">{children}</div>
}
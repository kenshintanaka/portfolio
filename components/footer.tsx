'use client'

import { Github, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-background/80 backdrop-blur-md border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
          © {currentYear} Julian Maggio. All rights reserved.
        </p>
        <div className="flex space-x-4">
          <a 
            href="https://github.com/julianmaggio" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <Github size={20} />
          </a>
          <a 
            href="https://www.linkedin.com/in/julian-maggio-58927b225/" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
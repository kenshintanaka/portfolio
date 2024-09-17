'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun, Monitor, Smartphone } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('system')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return isMobileOrTablet ? <Smartphone className="h-5 w-5" /> : <Monitor className="h-5 w-5" />
    } else if (theme === 'light') {
      return <Sun className="h-5 w-5" />
    } else {
      return <Moon className="h-5 w-5" />
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system'} theme`}
    >
      {getIcon()}
    </Button>
  )
}
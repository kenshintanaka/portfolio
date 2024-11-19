'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { motion, AnimatePresence } from 'framer-motion'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ExternalLink, Github } from 'lucide-react'
import { useTranslations } from 'next-intl'

const projects = [
  {
    id: 'aniVue',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/yes/www.anivue.com_-Aupk3y4RCwe6NcbN4S1RC3nWKmIFav.png',
    tags: ['Next.js', 'Vercel', 'Framer Motion', 'shadcn/ui'],
    siteUrl: 'https://www.anivue.com',
  },
  {
    id: 'comicSphere',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/yes/www.comicsphere.org_-SSrnig7HA6YT0eaRpKq4grGjT5cWGG.png',
    tags: ['Next.js', 'Vercel', 'Framer Motion', 'shadcn/ui'],
    siteUrl: 'https://www.comicsphere.org/',
  },
]

const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

const MotionCard = motion(Card)

export default function Projects() {
  const t = useTranslations('projects')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState(projects)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fuse = new Fuse(projects, {
    keys: ['id', 'tags'],
    threshold: 0.4,
  })

  useEffect(() => {
    let result = searchTerm
      ? fuse.search(searchTerm).map((res) => res.item)
      : projects

    if (selectedTags.length > 0) {
      result = result.filter((project) =>
        selectedTags.every((tag) => project.tags.includes(tag))
      )
    }

    setFilteredProjects(result)
  }, [fuse, searchTerm, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t('pageTitle')}
      </motion.h1>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {allTags.map((tag) => (
            <motion.div
              key={tag}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <Button
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredProjects.map((project) => (
            <MotionCard
              key={project.id}
              className="flex flex-col"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  },
                },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CardHeader>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Image
                    src={project.image}
                    alt={t(`projectDescriptions.${project.id}.title`)}
                    width={300}
                    height={200}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                </motion.div>
                <CardTitle>{t(`projectDescriptions.${project.id}.title`)}</CardTitle>
                <CardDescription>{t(`projectDescriptions.${project.id}.description`)}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-start gap-4">
                {project.siteUrl && (
                  <Link href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {t('visitSite')}
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </MotionCard>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

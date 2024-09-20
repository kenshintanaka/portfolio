'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'School Projects',
    description: 'A page with all my school projects.',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/yes/www.anivue.com_-Aupk3y4RCwe6NcbN4S1RC3nWKmIFav.png',
    tags: ['3D', 'School'],
    siteUrl: 'https://www.anivue.com',
  },
  {
    title: 'AniVue',
    description: 'Immerse yourself in the captivating world of anime with AniVue. This cinematic portal offers a vast library of Japanese animation, featuring personalized recommendations and a sleek, user-friendly interface. Experience the future of anime streaming.',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/yes/www.anivue.com_-Aupk3y4RCwe6NcbN4S1RC3nWKmIFav.png',
    tags: ['Next.js', 'Vercel', 'Framer Motion', 'shadcn/ui'],
    siteUrl: 'https://www.anivue.com',
  },
  {
    title: 'ComicSphere',
    description: 'Empower your comic vision with ComicSphere, a comprehensive platform for digital comic creation and distribution. From intuitive design tools to community engagement features, ComicSphere provides everything you need to bring your comic dreams to life and share them with the world.',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/yes/www.comicsphere.org_-SSrnig7HA6YT0eaRpKq4grGjT5cWGG.png',
    tags: ['Next.js', 'Vercel', 'Framer Motion', 'shadcn/ui'],
    siteUrl: 'https://www.comicsphere.org/'
  },
  {
    title: 'WebDemands',
    description: 'Welcome to WebDemand, where your digital ideas transform into reality. Our platform connects visionary clients with skilled developers, ensuring your web projects are brought to life with precision and creativity. Experience the future of web development collaboration.',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/yes/www.webdemand.dev_-XJ5PJmMYOnd1a6Vwcs7rqqrL1yBeyX.png',
    tags: ['Next.js', 'Vercel', 'shadcn/ui'],
    siteUrl: 'https://www.webdemand.dev/'
  },
  {
    title: 'Portfolio Website',
    description: "You're looking at it! This interactive showcase of my work demonstrates my passion for crafting engaging digital experiences. Featuring smooth animations, responsive design, and a curated selection of my best projects, this portfolio is a testament to my skills as a web developer.",
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/yes/localhost_3000_%20(2)-bTDtoBkX9SvBHxDuGj0TmSA7MdxPIb.png',
    tags: ['Next.js', 'Vercel', 'Framer Motion', 'shadcn/ui'],
    siteUrl: 'https://www.julianmaggio.me',
    githubUrl: 'https://github.com/julianmaggio/portfolio'
  },
]

const allTags = Array.from(new Set(projects.flatMap(project => project.tags)))

const MotionCard = motion(Card)

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const fuse = new Fuse(projects, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.4,
  })

  useEffect(() => {
    let result = searchTerm
      ? fuse.search(searchTerm).map(res => res.item)
      : projects

    if (selectedTags.length > 0) {
      result = result.filter(project =>
        selectedTags.every(tag => project.tags.includes(tag))
      )
    }

    setFilteredProjects(result)
  }, [searchTerm, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
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
        My Projects
      </motion.h1>
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          type="text"
          placeholder="Search projects..."
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
          {allTags.map(tag => (
            <motion.div
              key={tag}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <Button
                variant={selectedTags.includes(tag) ? "default" : "outline"}
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
              key={project.title}
              className="flex flex-col"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
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
                    alt={project.title}
                    width={300}
                    height={200}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                </motion.div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <motion.div 
                  className="flex flex-wrap gap-2"
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
                  {project.tags.map(tag => (
                    <motion.div
                      key={tag}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1 },
                      }}
                    >
                      <Badge variant="secondary">{tag}</Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
              <CardFooter className="flex justify-start gap-4">
                {project.siteUrl && (
                  <Link href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Site
                    </Button>
                  </Link>
                )}
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
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
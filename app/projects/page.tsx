'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Fuse from 'fuse.js'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

const projects = [
  {
    title: 'AniVue',
    description: 'Immerse yourself in the captivating world of anime with AniVue. This cinematic portal offers a vast library of Japanese animation, featuring personalized recommendations and a sleek, user-friendly interface. Experience the future of anime streaming.',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/placeholder-Z5R6NeRRilV9FltJrjP1InQd4k5GXr.svg',
    tags: ['Next.js', 'Vercel', 'Framer Motion', 'shadcn/ui'],
    siteUrl: 'https://www.anivue.com',
  },
  {
    title: 'ComicSphere',
    description: 'Empower your comic vision with ComicSphere, a comprehensive platform for digital comic creation and distribution. From intuitive design tools to community engagement features, ComicSphere provides everything you need to bring your comic dreams to life and share them with the world.',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/placeholder-Z5R6NeRRilV9FltJrjP1InQd4k5GXr.svg',
    tags: ['Next.js', 'Vercel', 'Framer Motion', 'shadcn/ui'],
    siteUrl: 'https://www.comicsphere.org/'
  },
  {
    title: 'WebDemands',
    description: 'Welcome to WebDemand, where your digital ideas transform into reality. Our platform connects visionary clients with skilled developers, ensuring your web projects are brought to life with precision and creativity. Experience the future of web development collaboration.',
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/placeholder-Z5R6NeRRilV9FltJrjP1InQd4k5GXr.svg',
    tags: ['Next.js', 'Vercel', 'shadcn/ui'],
    siteUrl: 'https://www.webdemand.dev/'
  },
  {
    title: 'Portfolio Website',
    description: "You're looking at it! This interactive showcase of my work demonstrates my passion for crafting engaging digital experiences. Featuring smooth animations, responsive design, and a curated selection of my best projects, this portfolio is a testament to my skills as a web developer.",
    image: 'https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/placeholder-Z5R6NeRRilV9FltJrjP1InQd4k5GXr.svg',
    tags: ['Next.js', 'Vercel', 'Framer Motion', 'shadcn/ui'],
    siteUrl: 'https://www.julianmaggio.me',
    githubUrl: 'https://github.com/julianmaggio/portfolio'
  },
]

const allTags = Array.from(new Set(projects.flatMap(project => project.tags)))

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
      <h1 className="text-4xl font-bold mb-8 animate-fade-in">My Projects</h1>
      <div className="mb-8 animate-fade-in-delay-1">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <Card key={index} className="animate-fade-in-delay-2 flex flex-col">
            <CardHeader>
              <Image
                src={project.image}
                alt={project.title}
                width={300}
                height={200}
                className="rounded-t-lg object-cover w-full h-48"
              />
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
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
          </Card>
        ))}
      </div>
    </div>
  )
}
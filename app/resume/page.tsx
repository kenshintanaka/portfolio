'use client'

import { useEffect } from 'react'
import { motion, useAnimate, stagger, AnimationSequence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Timeline, TimelineItem, TimelineContent } from "@/components/ui/timeline"
import { Briefcase, GraduationCap, Award, Code } from 'lucide-react'

const workExperience = [
  {
    title: "Full Stack Developer",
    company: "Kukiku",
    period: "2016 - Present",
    responsibilities: [
      "Develop and maintain web applications using modern technologies",
      "Implement responsive designs and optimize application performance",
      "Participate in code reviews and mentor junior developers"
    ]
  }
]

const education = [
  {
    degree: "Just some random tech school",
    institution: "VidenDjurs",
    period: "2024 - Present (Ongoing)",
    description: "Currently learning stuff, focusing on software engineering and web technologies"
  }
]

const skills = [
  { title: "Programming Languages", skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"] },
  { title: "Frameworks & Libraries", skills: ["React", "Node.js", "Next.js"] },
  { title: "Databases", skills: ["MongoDB", "PostgreSQL", "MySQL"] },
  { title: "Tools & Technologies", skills: ["Git", "Vercel", "REST API"] }
]

const certifications = [
  {
    title: "None",
    issuer: "None",
    date: "N/A",
    description: "Idk why I even added this section already"
  }
]

export default function Resume() {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence: AnimationSequence = [
      ['.section', { opacity: [0, 1], y: [20, 0] }, { duration: 0.3, delay: stagger(0.1) }],
      ['.timeline-item', { opacity: [0, 1], y: [20, 0] }, { duration: 0.3, delay: stagger(0.05) }],
    ]
    animate(sequence)
  }, [animate])

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  const timelineItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <div className="container mx-auto px-4 py-16" ref={scope}>
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        My Resume
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div className="section" variants={sectionVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline>
                {workExperience.map((job, index) => (
                  <motion.div key={index} className="timeline-item" variants={timelineItemVariants}>
                    <TimelineItem>
                      <TimelineContent>
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.company} • {job.period}</p>
                        <ul className="mt-2 list-disc list-inside text-sm">
                          {job.responsibilities.map((responsibility, idx) => (
                            <li key={idx}>{responsibility}</li>
                          ))}
                        </ul>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="section" variants={sectionVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline>
                {education.map((edu, index) => (
                  <motion.div key={index} className="timeline-item" variants={timelineItemVariants}>
                    <TimelineItem>
                      <TimelineContent>
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.institution} • {edu.period}</p>
                        <p className="mt-2 text-sm">{edu.description}</p>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div className="section" variants={sectionVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((category, index) => (
                  <motion.div key={index} className="timeline-item" variants={timelineItemVariants}>
                    <h3 className="font-semibold mb-2">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {certifications.length > 0 && (
          <motion.div className="section" variants={sectionVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Certifications & Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline>
                  {certifications.map((cert, index) => (
                    <motion.div key={index} className="timeline-item" variants={timelineItemVariants}>
                      <TimelineItem>
                        <TimelineContent>
                          <h3 className="text-lg font-semibold">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
                          {cert.description && <p className="mt-2 text-sm">{cert.description}</p>}
                        </TimelineContent>
                      </TimelineItem>
                    </motion.div>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
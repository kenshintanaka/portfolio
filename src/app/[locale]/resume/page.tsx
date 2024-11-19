'use client'

import { useEffect } from 'react'
import { motion, useAnimate, stagger, AnimationSequence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Timeline, TimelineItem, TimelineContent } from "@/components/ui/timeline"
import { Briefcase, GraduationCap, Award, Code } from 'lucide-react'
import { useTranslations } from 'next-intl'

const workExperience = [
  {
    title: "workExperience.content.job1.jobtitle",
    company: "workExperience.content.job1.company",
    period: "workExperience.content.job1.period",
    responsibilities: [
      "workExperience.content.job1.work.responsibility1",
      "workExperience.content.job1.work.responsibility2",
      "workExperience.content.job1.work.responsibility3"
    ]
  },
]

const education = [
  {
    degree: "education.content.education1.degree",
    institution: "education.content.education1.institution",
    period: "education.content.education1.period",
    description: "education.content.education1.description"
  },
]

const skills = [
  { title: "skills.sections.programmingLanguages", skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"] },
  { title: "skills.sections.frameworksLibraries", skills: ["React", "Node.js", "Next.js"] },
  { title: "skills.sections.databases", skills: ["MongoDB", "PostgreSQL", "MySQL"] },
  { title: "skills.sections.toolsTechnologies", skills: ["Git", "Vercel", "REST API"] }
]

const certifications = [
  {
    title: "certifications.content.certificate1.title",
    issuer: "certifications.content.certificate1.issuer",
    date: "certifications.content.certificate1.date",
    description: "certifications.content.certificate1.description"
  },
]

export default function Resume() {
  const t = useTranslations('resume')
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
        {t('pageTitle')}
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2">
        <motion.div className="section" variants={sectionVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                {t('workExperience.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline>
                {workExperience.map((job, index) => (
                  <motion.div key={index} className="timeline-item" variants={timelineItemVariants}>
                    <TimelineItem>
                      <TimelineContent>
                        <h3 className="text-lg font-semibold">{t(job.title)}</h3>
                        <p className="text-sm text-muted-foreground">{t(job.company)} • {t(job.period)}</p>
                        <ul className="mt-2 list-disc list-inside text-sm">
                          {job.responsibilities.map((responsibility, idx) => (
                            <li key={idx}>{t(responsibility)}</li>
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
                {t('education.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline>
                {education.map((edu, index) => (
                  <motion.div key={index} className="timeline-item" variants={timelineItemVariants}>
                    <TimelineItem>
                      <TimelineContent>
                        <h3 className="text-lg font-semibold">{t(edu.degree)}</h3>
                        <p className="text-sm text-muted-foreground">{t(edu.institution)} • {t(edu.period)}</p>
                        <p className="mt-2 text-sm">{t(edu.description)}</p>
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
                {t('skills.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((category, index) => (
                  <motion.div key={index} className="timeline-item" variants={timelineItemVariants}>
                    <h3 className="font-semibold mb-2">{t(category.title)}</h3>
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
                  {t('certifications.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Timeline>
                  {certifications.map((cert, index) => (
                    <motion.div key={index} className="timeline-item" variants={timelineItemVariants}>
                      <TimelineItem>
                        <TimelineContent>
                          <h3 className="text-lg font-semibold">{t(cert.title)}</h3>
                          <p className="text-sm text-muted-foreground">{t(cert.issuer)} • {t(cert.date)}</p>
                          {cert.description && <p className="mt-2 text-sm">{t(cert.description)}</p>}
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
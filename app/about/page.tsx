"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  CalendarDays,
  Code2,
  Globe,
  GraduationCap,
  Laptop,
  MapPin,
  Briefcase,
  Book,
  Palette,
} from "lucide-react";

const MotionCard = motion(Card);

export default function About() {
  const skills = [
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "Javascript", level: 80 },
    { name: "Python", level: 75 },
    { name: "Html", level: 70 },
    { name: "CSS", level: 70 },
    { name: "PHP", level: 65 },
  ];

  const certifications = [{ name: "None as of yet", year: "Present" }];

  const languages = [
    { name: "Danish", level: "Native", flag: "🇩🇰" },
    { name: "English", level: "Native", flag: "🇬🇧" },
    { name: "German", level: "Intermediate", flag: "🇩🇪" },
    { name: "Japanese", level: "Beginner", flag: "🇯🇵" },
    { name: "Chinese (Mandarin)", level: "Beginner", flag: "🇨🇳" },
    { name: "Taiwanese (Hokkien)", level: "Beginner", flag: "🇹🇼" },
    { name: "Cantonese", level: "Beginner", flag: "🇭🇰" },
  ];

  const interests = ["Web Development", "AI", "Cloud Computing"];

  const hobbies = ["Travel", "Cooking", "Programming"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
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
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h1>
      <motion.div
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <MotionCard className="md:row-span-2" variants={cardVariants}>
          <CardHeader>
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src="/avatar.jpg" alt="Julian Maggio" />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <CardTitle className="text-center mt-4">Julian Maggio</CardTitle>
            <CardDescription className="text-center">
              Full Stack Developer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Midtjylland, DK</span>
            </div>
            <p className="text-center mb-4">
              Passionate about creating innovative web solutions.
            </p>
            <div className="flex justify-center space-x-4">
              <Badge variant="outline">
                <Code2 className="w-4 h-4 mr-2" /> 5+ Years Exp
              </Badge>
              <Badge variant="outline">
                <GraduationCap className="w-4 h-4 mr-2" /> N/A
              </Badge>
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" /> Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              With over 5 years of experience in full stack development, I
              specialize in building scalable web applications using
              TypeScript, Next.js, and cloud technologies. I&apos;m
              passionate about clean code, user-centric design, and
              continuous learning.
            </p>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" /> Current Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Currently, I&apos;m focused on expanding my knowledge in AI and machine
              learning, particularly in their applications to web development.
              I&apos;m also exploring serverless architectures and edge computing
              to enhance the performance and scalability of web applications.
            </p>
          </CardContent>
        </MotionCard>

        <MotionCard className="md:col-span-2" variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Laptop className="w-5 h-5 mr-2" /> Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="w-24">{skill.name}</span>
                  <Progress value={skill.level} className="flex-grow" />
                  <span className="ml-2 text-sm">{skill.level}%</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" /> Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-none space-y-2">
              {languages.map((lang, index) => (
                <motion.li
                  key={lang.name}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="mr-2 text-xl">{lang.flag}</span>
                  <span>
                    {lang.name} - {lang.level}
                  </span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" /> Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  {cert.name} ({cert.year})
                </li>
              ))}
            </ul>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="w-5 h-5 mr-2" /> Recent Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Completed a major project using Next.js and TypeScript</li>
              <li>Contributed to open-source projects on GitHub</li>
              <li>Mentored junior developers in web technologies</li>
            </ul>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="w-5 h-5 mr-2" /> Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="secondary">{interest}</Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" /> Hobbies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge variant="outline">{hobby}</Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </MotionCard>
      </motion.div>
    </div>
  );
}
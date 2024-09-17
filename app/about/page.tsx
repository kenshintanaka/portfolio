"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Code2,
  Globe,
  GraduationCap,
  Laptop,
  MapPin,
  Briefcase,
  Book,
  Music,
  Palette,
} from "lucide-react";

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

  const interests = ["Nothing as of yet"];

  const hobbies = ["Travel", "Cooking", "Programming"];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 animate-fade-in">About Me</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 animate-fade-in-delay-1">
          <CardHeader>
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src="/avatar.jpg" alt="John Doe" />
              <AvatarFallback>JD</AvatarFallback>
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
        </Card>

        <Card className="md:col-span-2 animate-fade-in-delay-2">
          <Tabs defaultValue="overview">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="overview">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" /> Professional Summary
                </h3>
                <p className="mb-4">
                  With over 5 years of experience in full stack development, I
                  specialize in building scalable web applications using
                  TypeScript, Next.js, and cloud technologies. I'm passionate
                  about clean code, user-centric design, and continuous
                  learning.
                </p>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-2" /> Current Focus
                </h3>
                <p className="mb-2">
                  I'm currently pursuing my degree in Computer Science at [Your
                  University Name], where I'm diving deep into the world of
                  software engineering and cutting-edge technologies.
                </p>
                <p>
                  Alongside my studies, I'm exploring machine learning
                  applications in web development and contributing to
                  open-source projects that promote tech education. My
                  coursework and personal projects are allowing me to blend
                  theoretical knowledge with practical, real-world applications.
                </p>
              </TabsContent>
              <TabsContent value="skills">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Laptop className="w-4 h-4 mr-2" /> Technical Skills
                </h3>
                <div className="space-y-2 mb-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="flex items-center">
                      <span className="w-24">{skill.name}</span>
                      <Progress value={skill.level} className="flex-grow" />
                      <span className="ml-2 text-sm">{skill.level}%</span>
                    </div>
                  ))}
                </div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-2" /> Languages
                </h3>
                <ul className="list-none space-y-1">
                  {languages.map((lang) => (
                    <li key={lang.name} className="flex items-center">
                      <span className="mr-2 text-xl">{lang.flag}</span>
                      <span>
                        {lang.name} - {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="achievements">
                <h3 className="font-semibold mb-2 flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" /> Certifications
                </h3>
                <ul className="list-disc list-inside mb-4">
                  {certifications.map((cert) => (
                    <li key={cert.name}>
                      {cert.name} ({cert.year})
                    </li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2 flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" /> Recent Milestones
                </h3>
                <ul className="list-disc list-inside">
                  <li>Nothing as of yet</li>
                </ul>
              </TabsContent>
              <TabsContent value="personal">
                <h3 className="font-semibold mb-2 flex items-center">
                  <Book className="w-4 h-4 mr-2" /> Interests
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Palette className="w-4 h-4 mr-2" /> Hobbies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {hobbies.map((hobby) => (
                    <Badge key={hobby} variant="outline">
                      {hobby}
                    </Badge>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" /> My Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                className="bg-muted h-64 flex items-center justify-center rounded-md overflow-hidden"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  Globe visualization coming soon
                </motion.p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

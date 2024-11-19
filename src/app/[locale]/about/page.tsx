"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge as BadgeComponent } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Briefcase, Globe, Book, Palette, GraduationCap, Code2, LucideBadge } from "lucide-react";
import { useTranslations } from "next-intl";

const MotionCard = motion(Card);

export default function About() {
  const t = useTranslations("about")
  const interests = [t("interests.content.interest1"), t("interests.content.interest2"), t("interests.content.interest3")];
  const hobbies = [t("hobbies.content.hobby1"), t("hobbies.content.hobby2"), t("hobbies.content.hobby3")];
  const funFacts = [
    t("fun-facts.content.fact1")
  ];
  const personalPhilosophy = t("philosophy.content");
  const faqs = [
    {
      question: t("faq.content.faq1.question"),
      answer: t("faq.content.faq1.answer"),
    },
    {
      question: t("faq.content.faq2.question"),
      answer: t("faq.content.faq2.answer"),
    },
    {
      question: t("faq.content.faq3.question"),
      answer: t("faq.content.faq3.answer"),
    },
  ];

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
        {t("title")}
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
            {t("profile.title")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{t("profile.location")}</span>
            </div>
            <p className="text-center mb-4">
              {t("profile.description")}
            </p>
            <div className="flex justify-center space-x-4">
              <BadgeComponent variant="outline">
                <Code2 className="w-4 h-4 mr-2" /> {t("profile.experience")}
              </BadgeComponent>
              <BadgeComponent variant="outline">
                <GraduationCap className="w-4 h-4 mr-2" /> {t("profile.education")}
              </BadgeComponent>
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" /> {t("summery.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
            {t("summery.content")}
            </p>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" /> {t("focus.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
            {t("focus.content")}
            </p>
          </CardContent>
        </MotionCard>

        <MotionCard className="md:col-span-2" variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="w-5 h-5 mr-2" /> {t("interests.title")}
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
                  <BadgeComponent variant="secondary">
                    <Code2 className="w-4 h-4 mr-2" />
                    {interest}
                  </BadgeComponent>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </MotionCard>

        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="w-5 h-5 mr-2" /> {t("hobbies.title")}
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
                  <BadgeComponent variant="outline">
                    <LucideBadge className="w-4 h-4 mr-2" />
                    {hobby}
                  </BadgeComponent>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </MotionCard>

        {/* Fun Facts Section */}
        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LucideBadge className="w-5 h-5 mr-2" /> {t("fun-facts.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {funFacts.map((fact, index) => (
                <li key={index} className="mb-2">
                  {fact}
                </li>
              ))}
            </ul>
          </CardContent>
        </MotionCard>

        {/* Personal Philosophy Section */}
        <MotionCard variants={cardVariants}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code2 className="w-5 h-5 mr-2" /> {t("philosophy.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{personalPhilosophy}</p>
          </CardContent>
        </MotionCard>

        {/* FAQ Section */}
        <MotionCard variants={cardVariants} className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="w-5 h-5 mr-2" /> {t("faq.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </MotionCard>
      </motion.div>
    </div>
  );
}

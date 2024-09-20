"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const fullText = "I'm a Full Stack Developer";
  const isPC = useMediaQuery("(min-width: 1024px)");
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (isPC && backgroundRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = backgroundRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      };

      backgroundRef.current.addEventListener("mousemove", handleMouseMove);
      return () => {
        backgroundRef.current?.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      };
    }
  }, [isPC, mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const projects = [
    {
      title: "AniVue",
      description:
        "A sleek anime streaming platform with a vast library and personalized recommendations",
      tags: ["Next.js", "Vercel", "Framer Motion", "shadcn/ui"],
      siteUrl: "https://www.anivue.com",
    },
    {
      title: "ComicSphere",
      description:
        "A feature-rich SaaS for comic creators to host, manage, and monetize their digital comics",
      tags: ["Next.js", "Vercel", "Framer Motion", "shadcn/ui"],
      siteUrl: "https://www.comicsphere.org",
    },
    {
      title: "Portfolio Website",
      description:
        "An interactive showcase of my projects and skills, featuring smooth animations and a modern design",
      tags: ["Next.js", "Vercel", "Framer Motion", "shadcn/ui"],
      siteUrl: "https://www.julianmaggio.me",
      githubUrl: "https://github.com/julianmaggio/portfolio",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 md:p-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        ref={backgroundRef}
      >
        {isPC && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-3xl"
            style={{
              x: mouseXSpring,
              y: mouseYSpring,
              width: 400,
              height: 400,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        )}
        <div className="relative z-10 grid gap-12 md:grid-cols-2 items-center">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold mb-4">
              Hello, I&apos;m Julian Maggio
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-primary h-8">
              {typedText}
            </h2>
            <p className="text-lg mb-6">
              Passionate about creating innovative web solutions and turning
              ideas into reality through code.
            </p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/resume">View Resume</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            {!imageLoaded && (
              <Skeleton className="w-full h-full absolute inset-0" />
            )}
            <Image
              src="https://o9ybdhbfta3tzvhp.public.blob.vercel-storage.com/placeholder-Z5R6NeRRilV9FltJrjP1InQd4k5GXr.svg"
              alt="Julian Maggio"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              onLoad={() => setImageLoaded(true)}
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold mb-8 text-center"
        >
          Featured Projects
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.siteUrl && (
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={project.siteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Site
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-16 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">
          Let&apos;s Work Together
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg mb-8">
          I&apos;m always open to new opportunities and exciting projects. Feel free
          to reach out!
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button asChild size="lg">
            <Link href="/contact">
              Get in Touch <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
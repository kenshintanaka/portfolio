'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t('form.name.error'),
    }),
    email: z.string().email({
      message: t('form.email.error'),
    }),
    subject: z.string().min(5, {
      message: t('form.subject.error'),
    }),
    message: z.string().min(10, {
      message: t('form.message.error'),
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: t('popup.success.title'),
          description: t('popup.success.description'),
        })
        form.reset()
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (error) {
      toast({
        title: t('popup.success.title'),
        description: error instanceof Error ? error.message : t('popup.success.description'),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl font-bold mb-8 text-center">{t('title')}</motion.h1>
        <motion.p variants={itemVariants} className="text-lg text-center mb-12">{t('description')}
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('info.title')}</CardTitle>
                <CardDescription>{t('info.description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-primary" />
                  <p>{t('info.mail')}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  <p>{t('info.phone')}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <p>{t('info.location')}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>{t('form.title')}</CardTitle>
                <CardDescription>{t('form.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.name.title')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.name.placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.email.title')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.email.placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.subject.title')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('form.subject.placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('form.message.title')}</FormLabel>
                          <FormControl>
                            <Textarea placeholder={t('form.message.title')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('form.submit.sending')}
                        </>
                      ) : (
                        t('form.submit.button')
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
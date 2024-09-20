import { NextResponse } from 'next/server'

// Flag to enable/disable contact requests
const ENABLE_CONTACT_REQUESTS = true
export async function POST(request: Request) {
  if (!ENABLE_CONTACT_REQUESTS) {
    return NextResponse.json(
      { message: "Contact requests are currently disabled." },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Here you would typically send an email using a service like SendGrid, Mailgun, etc.
    // For this example, we'll just log the details and return a success response

    console.log('Received contact form submission:')
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Subject:', subject)
    console.log('Message:', message)

    // Simulate a delay to mimic email sending
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    )
  }
}
import nodemailer from 'nodemailer'
import { env } from './env'

// Konfigurasi transporter
const transporter = nodemailer.createTransport({
  host: env.HOST,
  port: 587,
  auth: {
    user: env.AUTH_USER,
    pass: env.AUTH_PASSWORD,
  },
})

interface SendEmailProps {
  to: string
  subject: string
  text: string
  html?: string
}

export const sendEmail = async ({ to, subject, text, html }: SendEmailProps) => {
  try {
    const info = await transporter.sendMail({
      from: '"Todos App" <todos@todos.app>',
      to,
      subject,
      text,
      html,
    })
    console.log('Email berhasil dikirim: %s', info.messageId)
    return info
  } catch (error) {
    console.error('Gagal mengirim email:', error)
  }
}

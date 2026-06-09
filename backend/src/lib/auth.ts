import 'dotenv/config'
import { db } from '../db'
import { sendEmail } from './email'
import { env } from './env'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

const getVerificationEmailHtml = (url: string) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Verify Email</title>
</head>
<body style="margin:0; padding:80px 20px; background:#171717; color:#fafafa; font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="background:#262626; border:1px solid rgba(255,255,255,.1); border-radius:12px; padding:40px;">
          <tr>
            <td>
              <h2 style="margin:0 0 32px; font-size:20px; font-weight:600; color:#fafafa;">Todo</h2>
              <h1 style="margin:0; font-size:40px; line-height:1.1; font-weight:700; color:#fafafa;">Verify Your Email</h1>
              <p style="margin:24px 0; font-size:15px; line-height:1.7; color:#a3a3a3;">Thanks for signing up for Todo. Please verify your email address to activate your account.</p>
              <a href="${url}" style="display:inline-block; padding:14px 24px; background:#fafafa; color:#171717; text-decoration:none; border-radius:8px; font-weight:600;">Verify Email</a>
              <p style="margin-top:24px; font-size:14px; line-height:1.6; color:#a3a3a3;">If you didn't create an account, you can safely ignore this email.</p>
              <hr style="margin:40px 0 24px; border:none; border-top:1px solid rgba(255,255,255,.1);">
              <p style="margin:0; font-size:13px; color:#737373;">Todo</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

const getResetPasswordEmailHtml = (url: string) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Reset Password</title>
</head>
<body style="margin:0; padding:80px 20px; background:#171717; color:#fafafa; font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="background:#262626; border:1px solid rgba(255,255,255,.1); border-radius:12px; padding:40px;">
          <tr>
            <td>
              <h2 style="margin:0 0 32px; font-size:20px; font-weight:600; color:#fafafa;">Todo</h2>
              <h1 style="margin:0; font-size:40px; line-height:1.1; font-weight:700; color:#fafafa;">Reset Password</h1>
              <p style="margin:24px 0; font-size:15px; line-height:1.7; color:#a3a3a3;">We received a request to reset the password for your Todo account. Click the button below to create a new password.</p>
              <a href="${url}" style="display:inline-block; padding:14px 24px; background:#fafafa; color:#171717; text-decoration:none; border-radius:8px; font-weight:600;">Create New Password</a>
              <p style="margin-top:24px; font-size:14px; line-height:1.6; color:#a3a3a3;">If you didn't request a password reset, you can safely ignore this email.</p>
              <hr style="margin:40px 0 24px; border:none; border-top:1px solid rgba(255,255,255,.1);">
              <p style="margin:0; font-size:13px; color:#737373;">Todo</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void sendEmail({
        to: user.email,
        subject: 'Reset your password - Todo App',
        text: `Click the link to reset your password: ${url}`,
        html: getResetPasswordEmailHtml(url),
      })
    },
    onPasswordReset: async ({ user }, request) => {
      console.log(`Password for user ${user.email} has been reset.`)
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      sendEmail({
        to: user.email,
        subject: 'Verify your email address - Todo App',
        text: `Click the link to verify your email: ${url}`,
        html: getVerificationEmailHtml(url),
      }).catch(console.error)
    },
    sendOnSignIn: true,
  },
  socialProviders: {
    google: {
      prompt: 'select_account consent',
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      accessType: 'offline',
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
  },
  trustedOrigins: ['http://localhost:3000'],
})

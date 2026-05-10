import { db } from '../db'
import { pushSubscriptions, reminders, tasks } from '../db/schema'
import { env } from '../lib/env'
import { and, eq, lte } from 'drizzle-orm'
import webpush from 'web-push'

// processDueReminders()
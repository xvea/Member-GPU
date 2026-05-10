import { createClient } from '@libsql/client'
import { env } from '../lib/env'
import * as schema from './schema'
import { drizzle } from 'drizzle-orm/libsql'

const client = createClient({ url: env.DB_FILE_NAME })
export const db = drizzle({ client, schema })

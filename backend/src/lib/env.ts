import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('3000'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    BETTER_AUTH_SECRET: z.string().min(1, { message: 'BETTER_AUTH_SECRET tidak boleh kosong' }),
    BETTER_AUTH_URL: z.string().url({ message: 'BETTER_AUTH_URL harus URL yang valid' }),

    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),

    TURSO_DATABASE_URL: z.string().optional(), 
    TURSO_AUTH_TOKEN: z.string().optional(),
    
    DB_FILE_NAME: z.string().default('file:local.db'),

    CRON_SECRET: z.string().min(1, { message: 'CRON_SECRET wajib diisi buat keamanan cron job' }),

    VAPID_SUBJECT: z.string().min(1, { message: 'VAPID_SUBJECT wajib diisi' }),
    VAPID_PUBLIC_KEY: z.string().min(1, { message: 'VAPID_PUBLIC_KEY wajib diisi' }),
    VAPID_PRIVATE_KEY: z.string().min(1, { message: 'VAPID_PRIVATE_KEY wajib diisi' }),
});

const envTest = envSchema.safeParse(process.env);

if (!envTest.success) {
    console.error('❌ Error, Ada kesalahan di konfigurasi environment:');
    console.error(envTest.error.format());
    process.exit(1);
}

export const env = envTest.data;

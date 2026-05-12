import { z } from 'zod';

// Schema untuk Pendaftaran Perangkat
export const subscribeDeviceSchema = z.object({
  endpoint: z.url(),
  expirationTime: z.number().nullable().optional(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

// Schema untuk Pembuatan Notifikasi Baru
export const createNotificationSchema = z.object({
  userId: z.string({
    required_error: "User ID  harus diisi",
  }).min(1, "User ID tidak boleh kosong"),

  title: z.string({
    required_error: "nama notifikasi harus diisi",
  }).min(3, "nama minimal 3 karakter").max(100, "nama maksimal 100 karakter"),

  message: z.string({
    required_error: "Pesan notifikasi wajib diisi",
  }).min(5, "Pesan minimal 5 karakter"),

  type: z.enum(['reminder', 'system', 'collaboration'], {
    invalid_type_error: "Tipe notifikasi tidak valid",
  }).default('reminder'),

  actionURL: z.string().optional(),
});

// supaya bisa digunakan di Controller atau service
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;


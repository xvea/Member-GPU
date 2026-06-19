import app from '../../src/app'
import { auth } from '../../src/lib/auth'
import * as taskService from '../../src/services/task.service'
import request from 'supertest'
import { describe, expect, it, vi } from 'vitest'

describe('Task API Endpoints', () => {
  // Mencari bug terkait keamanan dan otentikasi
  describe('Vulnerability Check', () => {
    it('harus menolak akses (401) jika user mencoba mengambil task tanpa login', async () => {
      // Tidak menyertakan header/cookie otentikasi
      const response = await request(app).get('/api/v1/tasks')

      expect(response.status).toBe(401)
      expect(response.body.success).toBe(false)
      expect(response.body.error).toBe('Unauthorized')
    })
  })

  // Mencari bug terkait validasi data dan logika bisnis
  describe('Bug Check', () => {
    it('harus menolak pembuatan task (400) jika title kosong atau tidak dikirim (Zod Validation)', async () => {
      // Mock session agar seolah-olah sudah login
      vi.spyOn(auth.api, 'getSession').mockResolvedValue({
        user: { id: 'test1234', email: 'test@test.com' },
      } as any)

      // Payload sengaja dibuat salah (tidak ada title)
      const response = await request(app).post('/api/v1/tasks').send({
        description: 'Task tanpa judul',
        priority: 'high',
      })

      expect(response.status).toBe(400)
      expect(response.body.success).toBe(false)
      // Memastikan middleware error menangkapnya
      expect(response.body.error).toBeDefined()
    })

    it('harus mencegah transisi status ilegal pada task', async () => {
      vi.spyOn(taskService, 'getTaskById').mockResolvedValue({
        id: 'task_1',
        status: 'todo',
      } as any)

      const response = await request(app).patch('/api/v1/tasks/task_1').send({ status: 'done' })

      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Invalid status transition')

      // Membersihkan mock setelah tes selesai agar tidak bocor ke tes lain
      vi.restoreAllMocks()
    })
  })

  // Mencari bug terkait operasi normal dan integrasi antar komponen
  describe('Normal Operation (Happy Path)', () => {
    it('harus berhasil membuat task baru dan mengembalikan status 201', async () => {
      // 1. Simulasi bahwa user sudah login agar lolos authMiddleware
      vi.spyOn(auth.api, 'getSession').mockResolvedValue({
        user: { id: 'test1234', email: 'test@test.com' },
      } as any)

      // 2. Simulasi bahwa data berhasil disimpan ke database
      vi.spyOn(taskService, 'createTask').mockResolvedValue({
        id: 'task_new',
        title: 'Belajar Vitest',
        priority: 'high',
        status: 'todo',
        userId: 'user_123',
      } as any)

      // Tembak API
      const response = await request(app).post('/api/v1/tasks').send({
        title: 'Belajar Vitest',
        priority: 'high',
      })

      // Lakukan Pengecekan
      expect(response.status).toBe(201)
      expect(response.body.success).toBe(true)
      expect(response.body.data.title).toBe('Belajar Vitest')

      // Bersihkan mock agar tidak mengganggu test lain
      vi.restoreAllMocks()
    })
  })
})

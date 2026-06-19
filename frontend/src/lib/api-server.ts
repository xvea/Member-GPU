import { headers } from 'next/headers'

export async function getTasksServer() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  try {
    const reqHeaders = await headers()

    const res = await fetch(`${baseUrl}/api/v1/tasks`, {
      headers: reqHeaders,
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('Server fetch failed:', res.status)
      return []
    }

    const json = await res.json()
    return json.data || []
  } catch (error) {
    console.error('Server fetch error:', error)
    return []
  }
}

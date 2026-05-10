import app from './app'
import { env } from './lib/env'

if (env.NODE_ENV === 'development') {
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`)
  })
}

export default app

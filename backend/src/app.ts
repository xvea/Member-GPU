import express, { Express } from 'express'
import { auth } from './lib/auth'
import { authMiddleware } from './middlewares/auth.middleware'
import { errorMiddleware } from './middlewares/error.middleware'
import cronRoutes from './routes/cron.route'
import listRoutes from './routes/list.route'
import notificationRoutes from './routes/notification.route'
import reminderRoutes from './routes/reminder.route'
import subtaskRoutes from './routes/subtask.route'
import tagRoutes from './routes/tag.route'
import taskTagRoutes from './routes/task-tag.route'
import taskRoutes from './routes/task.route'
import { toNodeHandler } from 'better-auth/node'
import cors from 'cors'
import morgan from 'morgan'

const app: Express = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

app.use(morgan('dev'))

app.all('/api/v1/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.use('/api/v1/cron', cronRoutes)

app.use(authMiddleware)

app.use('/api/v1/lists', listRoutes)
app.use('/api/v1/tasks', taskRoutes)
app.use('/api/v1/subtasks', subtaskRoutes)
app.use('/api/v1/reminders', reminderRoutes)
app.use('/api/v1/tags', tagRoutes)
app.use('/api/v1/task-tags', taskTagRoutes)
app.use('/api/v1/notifications', notificationRoutes)

app.use(errorMiddleware)

export default app

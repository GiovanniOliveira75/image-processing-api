import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { imageRoutes } from '@/routes/ImageRoutes'
import * as path from 'path'
import { ZodError } from 'zod'
import { env } from '@/env'

export const app = fastify()
app.register(fastifyMultipart, { addToBody: true })
app.register(fastifyStatic, {
  root: path.join(__dirname, '../output'),
  prefix: '/images',
})

app.register(imageRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.', error })
})

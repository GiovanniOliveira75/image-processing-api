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

app.get('/', async () => {
  return {
    greeting: 'Image Processing API',
    endpoints: [
      {
        method: 'POST',
        url: '/process-images-from-url',
        description: 'Process images from a URL',
      },
      {
        method: 'POST',
        url: '/process-images-from-upload',
        description: 'Process images from a file upload',
      },
      {
        method: 'POST',
        url: '/apply-watermark',
        description: 'Apply a watermark to an existing image',
      },
    ],
  }
})

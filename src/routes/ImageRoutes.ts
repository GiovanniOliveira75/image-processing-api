import { FastifyInstance } from 'fastify'
import {
  applyWaterMark,
  processImageFromUpload,
  processImagesFromUrl,
} from '@/controllers/ImageController'
export async function imageRoutes(app: FastifyInstance) {
  app.post('/process-images-from-url', processImagesFromUrl)

  app.post('/process-images-from-upload', processImageFromUpload)

  app.post('/apply-watermark', applyWaterMark)
}

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ImageProcessor } from '@/use-cases/ImageProcessor'
import { ImageRepository } from '@/repositories/ImageRepository'
import { ImageResponseInterface } from '@/interfaces/ImageResponseInterface'
import { ApplyWaterMark } from '@/use-cases/ApplyWaterMark'

export const processBodySchema = z.object({
  images: z.array(z.string()),
})

export async function processImagesFromUrl(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const { images } = processBodySchema.parse(request.body)

  const imageUseCase: ImageProcessor = new ImageProcessor(new ImageRepository())

  const processingPromises: Array<Promise<ImageResponseInterface>> = images.map(
    (image) => {
      return imageUseCase.processImageFromUrl(image)
    },
  )

  const processedImages: ImageResponseInterface[] =
    await Promise.all(processingPromises)

  reply.status(200).send({
    message: 'Images successfully processed',
    data: processedImages,
  })
}

export async function processImageFromUpload(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const imageUploadSchema = z.object({
    images: z.array(
      z.object({
        data: z.custom((file: any) => {
          if (!file) {
            return false
          }

          return file
        }, 'Invalid file'),
        mimetype: z.custom((mimetype: any) => {
          const allowedMimeTypes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/gif',
          ]
          if (!allowedMimeTypes.includes(mimetype)) {
            return false
          }

          return mimetype
        }, 'Invalid mimetype. Allowed: jpg, jpeg, png, gif'),
      }),
    ),
  })

  const { images } = imageUploadSchema.parse(request.body)

  const imageUseCase: ImageProcessor = new ImageProcessor(new ImageRepository())

  const processingPromises: Array<Promise<ImageResponseInterface>> = images.map(
    (image) => {
      return imageUseCase.processImageFromUpload(image.data)
    },
  )

  const processedImagePaths: ImageResponseInterface[] =
    await Promise.all(processingPromises)

  reply.status(200).send({
    message: 'Images successfully processed',
    data: processedImagePaths,
  })
}

export async function applyWaterMark(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> {
  const applyWaterMarkSchema = z.object({
    image: z.string(),
    waterMark: z.string(),
  })

  const { image, waterMark } = applyWaterMarkSchema.parse(request.body)

  const waterMarkUseCase: ApplyWaterMark = new ApplyWaterMark(
    new ImageRepository(),
  )

  const processedImage: ImageResponseInterface = await waterMarkUseCase.execute(
    image,
    waterMark,
  )

  reply.status(200).send({
    message: 'Image successfully processed',
    data: processedImage,
  })
}

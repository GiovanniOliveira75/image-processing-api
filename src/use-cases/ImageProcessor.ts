import axios, { AxiosResponse } from 'axios'
import crypto from 'crypto'
import sharp from 'sharp'
import { Image } from '@/entities/Image'
import { ImageRepository } from '@/repositories/ImageRepository'
import { ImageResponseInterface } from '@/interfaces/ImageResponseInterface'
import { ImageProcessingError } from '@/use-cases/errors/ImageProcessingError'

export class ImageProcessor {
  constructor(private readonly imageProcessorRepository: ImageRepository) {}

  async processImageFromUrl(
    url: string,
    quality?: number,
  ): Promise<ImageResponseInterface> {
    try {
      const response: AxiosResponse<ArrayBuffer> = await axios.get(url, {
        responseType: 'arraybuffer',
      })
      const imageData: ArrayBuffer = response.data
      const imageBuffer: Buffer = Buffer.from(imageData)

      const imageProcessed: Image = await this.processImage(
        imageBuffer,
        quality,
      )

      const imageResponse: Image =
        await this.imageProcessorRepository.saveImage(imageProcessed)

      return imageResponse.toJson()
    } catch (error: any) {
      throw new ImageProcessingError(
        `Error processing image from URL ${url}: ${error.message}`,
      )
    }
  }

  async processImageFromUpload(
    image: Buffer,
    quality?: number,
  ): Promise<ImageResponseInterface> {
    try {
      const imageProcessed: Image = await this.processImage(image, quality)

      const imageResponse: Image =
        await this.imageProcessorRepository.saveImage(imageProcessed)

      return imageResponse.toJson()
    } catch (error: any) {
      throw new ImageProcessingError(`Error processing image: ${error.message}`)
    }
  }

  private async processImage(
    imageBuffer: Buffer,
    quality = 80,
  ): Promise<Image> {
    try {
      const webpBuffer: Buffer = await sharp(imageBuffer)
        .webp({ quality })
        .toBuffer()

      const imageName: string =
        crypto.createHash('md5').update(imageBuffer).digest('hex') + '.webp'

      return new Image(imageName, webpBuffer)
    } catch (error: any) {
      throw new ImageProcessingError(`Error processing image: ${error.message}`)
    }
  }
}

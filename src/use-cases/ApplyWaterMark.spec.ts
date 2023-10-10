import { describe, expect, it } from 'vitest'
import { ImageRepository } from '@/repositories/ImageRepository'
import { ImageProcessor } from '@/use-cases/ImageProcessor'
import { ApplyWaterMark } from '@/use-cases/ApplyWaterMark'
import { env } from '@/env'

describe('Water Mark Use Case', () => {
  it('should process successfully an image applying a watermark', async () => {
    const imageUseCase: ImageProcessor = new ImageProcessor(
      new ImageRepository(),
    )
    const waterMarkUseCase: ApplyWaterMark = new ApplyWaterMark(
      new ImageRepository(),
    )

    const image = await imageUseCase.processImageFromUrl(
      'https://i.imgur.com/GeyOGcm.jpeg',
    )

    expect(image).toBeDefined()

    const waterMark = await imageUseCase.processImageFromUrl(
      'https://i.imgur.com/rY62hRY.png',
    )

    expect(waterMark).toBeDefined()

    const waterMarked = await waterMarkUseCase.execute(
      image.name,
      waterMark.name,
    )

    expect(waterMarked).toBeDefined()

    expect(waterMarked.name).toBe(
      `${image.name.replace('.webp', '')}.watermarked.webp`,
    )

    expect(waterMarked.filePath).toBe(
      `${env.APP_URL}/images/${image.name.replace(
        '.webp',
        '',
      )}.watermarked.webp`,
    )
  })

  it('should throw an error when trying to process an image that does not exist', async () => {
    const waterMarkUseCase: ApplyWaterMark = new ApplyWaterMark(
      new ImageRepository(),
    )

    try {
      await waterMarkUseCase.execute('notfound.webp', 'notfound.webp')
    } catch (error: any) {
      expect(error.message).toBe('Image not found')
    }
  })

  it("should throw an error when trying to apply a watermark to an image that doesn't exist", async () => {
    const imageUseCase: ImageProcessor = new ImageProcessor(
      new ImageRepository(),
    )
    const waterMarkUseCase: ApplyWaterMark = new ApplyWaterMark(
      new ImageRepository(),
    )

    const image = await imageUseCase.processImageFromUrl(
      'https://i.imgur.com/GeyOGcm.jpeg',
    )

    expect(image).toBeDefined()

    try {
      await waterMarkUseCase.execute(image.name, 'notfound.webp')
    } catch (error: any) {
      expect(error.message).toBe('WaterMark not found')
    }
  })
})

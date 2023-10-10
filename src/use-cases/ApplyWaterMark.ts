import { ImageResponseInterface } from '@/interfaces/ImageResponseInterface'
import { ImageRepository } from '@/repositories/ImageRepository'

export class ApplyWaterMark {
  constructor(private readonly imageRepository: ImageRepository) {}

  async execute(
    imageName: string,
    waterMarkName: string,
  ): Promise<ImageResponseInterface> {
    const image = await this.imageRepository.getImageByName(imageName)
    const waterMark = await this.imageRepository.getImageByName(waterMarkName)

    if (!image) {
      throw new Error('Image not found')
    }

    if (!waterMark) {
      throw new Error('WaterMark not found')
    }

    const imageWithWaterMark = await this.imageRepository.applyWaterMark(
      image,
      waterMark,
    )

    return {
      name: imageWithWaterMark.name,
      filePath: imageWithWaterMark.filePath,
    }
  }
}

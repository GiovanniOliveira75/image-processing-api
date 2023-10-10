import { Image } from '@/entities/Image'
import { ImageRepositoryInterface } from '@/interfaces/ImageRepositoryInterface'
import { env } from '@/env'
import fs from 'fs-extra'
import sharp from 'sharp'

export class ImageRepository implements ImageRepositoryInterface {
  async saveImage(image: Image): Promise<Image> {
    fs.ensureDirSync(env.FILE_OUTPUT_DIR)

    const outputPath = `${env.FILE_OUTPUT_DIR}/${image.name}`

    await fs.writeFile(outputPath, image.data)

    return image
  }

  async getImageByName(name: string): Promise<Image | null> {
    const imagePath = `${env.FILE_OUTPUT_DIR}/${name}`

    const imageExists = await fs.pathExists(imagePath)

    if (!imageExists) {
      return null
    }

    const imageBuffer = await fs.readFile(imagePath)

    return new Image(name, imageBuffer)
  }

  async applyWaterMark(image: Image, waterMark: Image): Promise<Image> {
    const imageToApply = sharp(image.outputFilePath)

    const waterMarkImage = await sharp(waterMark.outputFilePath).resize(
      100,
      100,
    )

    const watermarkedImageName = image.outputFilePath.replace(
      '.webp',
      '.watermarked.webp',
    )

    await imageToApply
      .composite([
        { input: await waterMarkImage.toBuffer(), gravity: 'southeast' },
      ])
      .toFile(watermarkedImageName)

    image.name = watermarkedImageName.replace(`${env.FILE_OUTPUT_DIR}/`, '')

    return image
  }
}

import { Image } from '@/entities/Image'

export interface ImageRepositoryInterface {
  saveImage(image: Image): Promise<Image>
  getImageByName(imageName: string): Promise<Image | null>
  applyWaterMark(image: Image, waterMark: Image): Promise<Image>
}

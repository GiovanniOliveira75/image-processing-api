import { describe, it, expect } from 'vitest'
import { ImageProcessor } from '@/use-cases/ImageProcessor'
import { ImageRepository } from '@/repositories/ImageRepository'
import fs from 'fs-extra'
import {env} from "@/env";
import * as path from "path";

describe('Image Processor Use Case', () => {
  it('should process successfully an image from url', async () => {
    const imageUseCase: ImageProcessor = new ImageProcessor(
      new ImageRepository(),
    )

    const image = await imageUseCase.processImageFromUrl(
      'https://i.imgur.com/GeyOGcm.jpeg',
    )

    expect(image).toBeDefined()

    expect(fs.readFile(`${env.FILE_OUTPUT_DIR}/${image.name}`)).toBeDefined()
  })

    it('should process successfully an image from upload', async () => {
        const imageUseCase: ImageProcessor = new ImageProcessor(
            new ImageRepository(),
        )

        const image = await imageUseCase.processImageFromUpload(
            fs.readFileSync(path.resolve(__dirname, '../tests/fixtures/dummy-image.jpeg')),
        )

        expect(image).toBeDefined()

        expect(fs.readFile(`${env.FILE_OUTPUT_DIR}/${image.name}`)).toBeDefined()
    })

    it('should throw an error when trying to process an image that does not exist', async () => {
        const imageUseCase: ImageProcessor = new ImageProcessor(
            new ImageRepository(),
        )

        try {
            await imageUseCase.processImageFromUrl('https://images.pexels.com/photos/14241230490/pexels-photo-14240490.jpeg')
        } catch (error: any) {
            expect(error.message).toBe('Error processing image from URL https://images.pexels.com/photos/14241230490/pexels-photo-14240490.jpeg: Request failed with status code 404')
        }
    })

    it('should throw an error when trying to process an image from upload and throws an error', async () => {
        const imageUseCase: ImageProcessor = new ImageProcessor(
            new ImageRepository(),
        )

        try {
            await imageUseCase.processImageFromUpload(Buffer.from(''))
        } catch (error: any) {
            expect(error.message).contains('Error processing image:')
        }
    })
})

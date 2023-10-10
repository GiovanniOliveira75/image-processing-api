import {describe, it, expect} from "vitest";
import {Image} from "@/entities/Image";

describe('Image Entity', () => {
    it('should be able to create an image', () => {
        const image = new Image('image.webp', Buffer.from('image data'))

        expect(image).toBeInstanceOf(Image)
    })

    it('should be able to get image name', () => {
        const image = new Image('image.webp', Buffer.from('image data'))

        expect(image.name).toBe('image.webp')
    })

    it('should be able to get image data', () => {
        const image = new Image('image.webp', Buffer.from('image data'))

        expect(image.data).toBeInstanceOf(Buffer)
    })

    it('should be able to get image data as string', () => {
        const image = new Image('image.webp', Buffer.from('image data'))

        expect(image.data.toString()).toBe('image data')
    })

    it('should be able to get image file path', () => {
        const image = new Image('image.webp', Buffer.from('image data'))

        expect(image.filePath).toBe('http://localhost:3000/images/image.webp')
    })

    it('should be able to get image output file path', () => {
        const image = new Image('image.webp', Buffer.from('image data'))

        expect(image.outputFilePath).toBe('output/image.webp')
    })

    it('should be able to get image json', () => {
        const image = new Image('image.webp', Buffer.from('image data'))

        expect(image.toJson()).toStrictEqual({
            name: 'image.webp',
            filePath: 'http://localhost:3000/images/image.webp'
        })
    })
})
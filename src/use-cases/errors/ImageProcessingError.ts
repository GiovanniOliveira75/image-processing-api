export class ImageProcessingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ImageProcessingError'
  }
}

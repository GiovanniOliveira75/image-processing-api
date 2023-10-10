import { env } from '@/env'
import { ImageResponseInterface } from '@/interfaces/ImageResponseInterface'

export class Image {
  constructor(
    public name: string,
    public data: Buffer,
  ) {}

  public get filePath(): string {
    return `${env.APP_URL}/images/${this.name}`
  }

  public get outputFilePath(): string {
    return `${env.FILE_OUTPUT_DIR}/${this.name}`
  }

  public toJson(): ImageResponseInterface {
    return {
      name: this.name,
      filePath: this.filePath,
    }
  }
}

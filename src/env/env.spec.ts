import { describe, it, expect } from 'vitest'
import { env } from '@/env/index'

describe('Env Config', () => {
  it('should be able to get env variables', () => {
    expect(env.APP_URL).toBeDefined()
    expect(env.FILE_OUTPUT_DIR).toBeDefined()
  })

  it('should be able to get env variables with default values', () => {
    expect(env.NODE_ENV).toBe('test')
    expect(env.PORT).toBe(3000)
  })

  it('should throw an error when trying to get an invalid env variable', () => {
    try {
      // @ts-ignore
      env.INVALID_ENV_VARIABLE
    } catch (error: any) {
      expect(error.message).toBe(
        "Cannot read property 'INVALID_ENV_VARIABLE' of undefined",
      )
    }
  })
})

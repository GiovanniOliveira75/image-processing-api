import { app } from '@/app'
import { env } from '@/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('docs: http://localhost:3000/docs')
    console.log('🤘 Server is running on port 3000')
  })

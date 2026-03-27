import express from 'express'
import payload from 'payload'

const app = express()

app.get('/', (_, res) => res.redirect('/admin'))

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.listen(3001, () => {
    payload.logger.info('Server listening on port 3001')
  })
}

start()

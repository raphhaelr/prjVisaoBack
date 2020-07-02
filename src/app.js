const express = require('express')
require('express-async-errors')
const cors = require('cors')
const app = express()
const routes = require('./shared/routes')

app.use(cors())
app.use(express.json())
app.use(routes)


app.use((err, request, response, next) => {
  if (err instanceof Error) {
    return response.status(400).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    error: 'error',
    message: 'Internal server error.'
  })
})

app.listen(3333, () => {
  console.log('Server started')
})


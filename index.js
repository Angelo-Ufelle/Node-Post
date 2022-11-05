const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.use(bodyparser.urlencoded({extended:false}))

const HOST = 'localhost'
const PORT = 5000

app.post('/', (req, res) => {
  if (JSON.stringify(req.body) === '{}') {
    req.body = {
      operation_type: 'addition',
      x: 1,
      y: 1
    }
  }

  const { operation_type, x, y } = req.body

  if (isNaN(x) || isNaN(y))
    return res.send({
      error: "Wrong values"
    })

  let result = ''

  if (operation_type.toLowerCase() === "addition") {
    result = +x + +y
  }
  else if (operation_type.toLowerCase() === "multiplication") {
    result = +x * +y
  }
  else if (operation_type.toLowerCase() === "subtraction") {
    result = +x - +y
  }
  else return res.send({
    error: "Put in an operation_type of 'addition', 'multiplication', or 'subtraction' "
  })

  res.send({
    slackUsername: 'Ang_Elo',
    result,
    operation_type
  })
})

app.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}`))
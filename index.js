const express = require('express')

const api = express()

const HOST = 'localhost'
const PORT = 5000

api.get('/', (req,res) => {
    res.json({"slackusername": "Ang_Elo", "backend": true, "operation_type": "Addition", "result": "10"})
})

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}`))
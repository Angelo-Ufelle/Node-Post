const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const api = express()

api.use(bodyparser.urlencoded({extended:true}))

const HOST = 'localhost'
const PORT = 5000

api.use(cors({origin: ["*"]}))
api.post("/", (req, res) => {
  const {operation_type, x, y, } = req.body
  let result = 0

  let operation = undefined
  const addition = /addition|add|join|sum|joining|summing|concatenate|concatenating?/gi
  const substraction = /substraction|subtraction|substract|remove|eliminate|elimination?/gi
  const multiplication = /multiplication|multiply?/gi
  let x1=0,y1=0

  if(!operation_type){
    return res.status(400).json({
      message: "operation not found"
    })
  } 
  if(operation_type.match(addition)){
    operation = "addition"
  } else if(operation_type.match(substraction)){
    operation = "subtraction"
  } else if(operation_type.match(multiplication)){
    operation = "multiplication"
  }

  if(!x || !y){
    thenum = operation_type.match(/\d/g); 
    if(thenum.length>1){
      x1 = parseInt(thenum[0])
      y1 = parseInt(thenum[1])
    }
  }
  if(!operation){
    return res.status(400).json({
      message: "operation not found"
    })
  }

  switch(operation){
    case "addition": {
        result =(x || y)?parseInt(x)+parseInt(y):x1+y1
        break
    }
    case "subtraction" || "substraction": {
      result = (x || y)?parseInt(x)-parseInt(y):x1-y1
      break
  }
  case "multiplication": {
    result = (x || y)?parseInt(x)*parseInt(y):x1*y1
    break
}
  }

  console.log(result)
  res
    .status(200)
    .json({
      slackUsername: "Ang_Elo",
      result,
      operation_type: operation
    });
});

api.get('/', (req, res)=>{
 
  res.status(200).json({
    message: "send a post request to /"
  })
})

api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}`))
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const foodroutes = require('./routes/foods.js')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')


const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Food Delivery API',
      version: '1.0.0',
      description: 'API for managing food orders and calculating delivery cost',
    },
    servers: [
      {
        url: `http://${process.env.deploy_host}:8000`
      }
    ]
  },
  apis: ['./routes/*.js']

};

const specs = swaggerJsdoc(swaggerOptions);



const app = express()
const PORT = process.env.PORT || 8000
app.use(express.urlencoded({ extended: false }))
dotenv.config()

app.get("/api",(req,res) => {
  res.status(200).json({message : "Status ok ready for deployment"})
})
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api", foodroutes)



app.listen(PORT, () => console.log("this is listenting on port 8000"))
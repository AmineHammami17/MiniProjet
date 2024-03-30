const express = require('express')
const dotenv = require('dotenv');
dotenv.config({ path: "config.env" });
const morgan = require('morgan');
const mountRoutes = require('./routes/index');
const dbConnecction = require("./config/database");


const app = express()
app.use(express.json());

//DB CONNECTION
dbConnecction();

//handling errors/exceptions
mountRoutes(app);
app.all('*',(req,res,next)=>{
const err = new Error('Cannot find this route');
next(err.message);
});
app.use((err,req,res,next)=>{
  res.status(400).json({err});

});


if(process.env.NODE_ENV=="development"){
  app.use(morgan('dev'));
  console.log('mode :',process.env.NODE_ENV);
}


app.listen(process.env.PORT,()=>{
  console.log('Server running on port',process.env.PORT);
})



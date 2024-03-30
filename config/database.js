const mongoose = require('mongoose');
const dbConnection = ()=>{

    mongoose.connect(process.env.DB_URI)
    .then(() =>{ console.log('Connected!');
    })
    .catch(()=>{ console.log('Not Connected!');})

};

module.exports = dbConnection;

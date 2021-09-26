require('dotenv').config();

const express= require('express');
const cors = require('cors');

const {dbConnection}= require('./database/config');



const app = express();
app.use(cors());


dbConnection();
//dMdJKrLbUwGxtWtT
//mean-user
// console.log(process.env);

app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'Hola Mundo'
    })
});


app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en puerto '+ process.env.PORT);
})










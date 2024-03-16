const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const sinhvienRoute = require('./routes/sinhvienRoute');
const sinhvien = require('./models/sinhvienModel');
const app = express();//tao doi tuong moi
//ket noi mongodb
mongoose.connect('mongodb://localhost:27017/Demo3',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Ket noi thanh cong voi sever");
}).catch((err) =>{
    console.error(err);
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
//su dung route
app.use('/', sinhvienRoute);
//goi den file ejs
app.set('view engine', 'ejs');
//tao port
const PORT = process.env.PORT||5000;
//chay sever
app.listen(PORT,()=>{
    console.log('sever dang chay o cong 5000');
})
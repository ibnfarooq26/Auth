const express=require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app= express();
const cookieParser = require('cookie-parser')
const authRoutes=require('./router/authRoutes');
const { authenticate } = require('./controllers/authControllers');
const dburl=process.env.DB_URL // need to change
const PORT=process.env.PORT || 5000;  // Need to change

mongoose.connect(dburl).then(result=>{
    app.listen(PORT,()=>{
        console.log(`server is running at ${PORT}`)
    })}).catch(err=>{
        console.log(err);
    })

 // middle ware   
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(authRoutes)

app.set('view engine', 'ejs');

app.get('/', authenticate, (req,res)=>{
    res.render('home');
})

// app.get('/signup', (req,res)=>{
//     res.render('signup')
// })










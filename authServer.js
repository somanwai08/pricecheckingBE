require('dotenv').config()

const express = require('express')

const app = express()

const jwt = require('jsonwebtoken')

const cors = require('cors')

app.use(express.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  

// get a token to log in api
app.post('/pricechecklogin',(req,res)=>{
    // authenticate User

    
    const username=req.body.username
    const password=req.body.password
    if(username==='abc'&&password==='123'){
        const user={name:username}
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'20s'})
        res.json({accessToken:accessToken})
    }else{
        res.send({code:401,message:'wrong password or username'})
    }
})

app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.get('/verifypricechecktoken',(req,res)=>{


    const authHeader = req.headers['authorization']

    const token = authHeader&&authHeader.split(' ')[1]

    if(token==null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) {
            return res.sendStatus(403)
        }
        req.user = user
        res.send({messge:'user is logged in'})
        next()
    })
})


// function authenticateToken(req,res,next){
//     const authHeader = req.headers['authorization']

//     const token = authHeader&&authHeader.split(' ')[1]

//     if(token==null) return res.sendStatus(401)

//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if(err) return res.sendStatus(403)
//         req.user = user
//         next()
//     })
// }


app.listen(4000)
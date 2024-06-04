import express from 'express'
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const app=express()
app.use(express.json())

const posts=[
    {
        username:'Anton',
        title:'this is good'
    },
    {
        username: 'gru',
        title:'Mwahha'
    }
]

app.get('/posts', authenticateToken, (req,res)=>{
    res.json(posts.filter(post=>post.username===req.user.name))
})

app.post('/login', (req,res)=>{
    const username = req.body.username
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
    res.json({accessToken:accessToken})
})

// sales_token
// jwt.verify(token, sales_token)

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      else
      {req.user=user}
      
      next()
    })
  }

app.listen(3000,()=>console.log("app listening at 30000"))
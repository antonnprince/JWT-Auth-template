import express from 'express'
const app=express()
app.use(express.json())

// {
//     name:abc,
//     courses:[200,300]
//     role:"student"
// }

const authPage=(permissions)=>{
    return (req,res,next)=>{
        const userRole = req.body.role
        if(permissions.includes(userRole))
            next()
        else{
            return res.status(401).json("No permission")
        }
    }
}

const authCourse=(req,res,next)=>{
    const courseNumber = parseInt(req.params.number)
    if(req.body.courses.includes(courseNumber))
        next()
    else{
        return res.status(401).json("No access")
    }
}

app.get('/', (req,res)=>{
    res.json("Home Page")
})

app.get("/course/grades",authPage(["teacher","admin"]), (req,res)=>{
    res.json({
        pedro:100,
        paulo:95,
        leo:34,
        colin:67
    })
    
})

app.get("/course/:number", (req,res)=>{
        const courseNumber = req.params.number
        res.json(`you have access to course no ${courseNumber}`)
    })



app.listen(3000, ()=>{
    console.log("Running at port 3000")
})

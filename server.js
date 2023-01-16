const express = require('express');
const bcrypt = require('bcrypt')
const app = express();
app.use(express.json())
const users = []

// app.get('/users', (req,res)=>{
//     res.json(users)
// })

app.post('/users', async (req,res)=>{
   try {
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt)
    const user = { name: req.body.name, password: hashpassword }  
    console.log(user);
    users.push(user)
    res.status(201).send({ result : "sucess" })
   } catch (error) {
    res.status(500).send({
        result : "Something went wrong"
    })
   }
})



app.post('/users/login', async (req,res)=>{
    console.log(("users are : ", users));
    const user = users.find(user =>  user.name = req.body.name )
    console.log("user is ", user)
    if(user == null){
        return res.status(404).send({
            result : "Please enter a correct username"
        })
    }
        try {
           if(await bcrypt.compare(req.body.password, users[0].password)){
            res.status(201).send({
                result : "Logged in"
            })
           }else{
                res.status(404).send({
                    result : "Please enter a correct password"
                })
           }
        } catch (error) {
           console.log(error);
        }

 })
app.listen(4000)
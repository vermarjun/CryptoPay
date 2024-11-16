const express = require("express");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT;
const dotenv = require("dotenv")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const slatRound = 3;

const app = express();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors())
app.use(express.json());

app.post("/api/signup", async (req, res)=>{
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, slatRound)
    const token = jwt.sign(hashedPassword, JWT_SECRET);
    res.json({
        accessToken:token
    })
})

app.post("/api/signin", async (req, res)=>{
    const password = req.body.password;
    const token = req.body.token;
    const passwordHash = await jwt.verify(token, JWT_SECRET);
    const passCorrect = await bcrypt.compare(password, passwordHash);
    if (passCorrect){
        res.json({
            accessToken:token
        })
    } else {
        res.json({
            accessToken:"invalid"
        })
    }
})

app.post("/verify", (req, res)=>{
    const token = req.body.token;
    const t = jwt.verify(token, JWT_SECRET);
    if (t){
        res.json({
            message:"valid"
        })
    } else {
        res.json({
            message:"invalid"
        })
    } 
})

app.listen(3000, () =>{
    console.log("Server is UP, Guess what else is?")
})
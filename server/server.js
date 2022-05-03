const generateWordList = require('./wordList')

//console.log(generateWordList({correct: 'M,L,T', wrong:'O,I'}))

const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/api/checkWords', async (req, res) =>{
    
    const request = req.body
    const words = await generateWordList(request)

    console.log(words)
    res.send(words)
})

app.get('/teste', (req, res) =>{
    //res.send('teste')
    res.status(201).json({message: "testando123", status: 201})
})


app.listen(3000, () => console.log('backend running on port 3000'))
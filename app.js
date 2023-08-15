const express = require('express')
const app = express()
const { getTopics, getAllApis } = require('./db/Controllers/topics.controller')




app.get('/api/topics', getTopics)

app.get('/api', getAllApis)

 

app.use((_, response) => {
    response.status(404).send({msg: 'Nothing found'});
})
app.use((err,req,res,next)=>{
res.status(500).send('Internal server error')
})



module.exports = app
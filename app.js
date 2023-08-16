const express = require('express')
const app = express()
const { getTopics, getAllApis } = require('./db/Controllers/topics.controller')
const { getByIds } = require('./db/Controllers/articles.controller.js')




app.get('/api/topics', getTopics)

app.get('/api', getAllApis)

// app.get('/api/articles/:article_id', getByIds)
 

app.use((_, response) => {
    response.status(404).send({msg: 'Nothing found'});
})
app.use((err,req,res,next)=>{
res.status(500).send('Internal server error')
})



module.exports = app
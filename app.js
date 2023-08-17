const express = require('express')
const app = express()
const { getTopics, getAllApis } = require('./Controllers/topics.controller')
const getArticleById  = require('./Controllers/articles.controller')

app.get('/api/topics', getTopics);

app.get('/api', getAllApis);
 
app.get('/api/articles/:article_id', getArticleById);



app.use((_, response) => {
    response.status(404).send({msg: 'Nothing found'});
})


app.use((err,request,response,next)=>{
    console.log(err, "error in app.js")
    if (err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg });
  } else if (err.code === '22P02') {
    response.status(400).send({ msg: 'Invalid request' });} 
else { next()}})
    

app.use((err,req,res,next)=>{
    res.status(500).send('Internal server error!')
    })




module.exports = app
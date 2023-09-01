const express = require('express')
const app = express()
const { getTopics, getAllApis } = require('./Controllers/topics.controller')
const {getArticleById, getAllArticlesOrderByCreatedAt,patchArticleVotes}  = require('./Controllers/articles.controller')
const {postCommentById, getCommentsByArticleId } = require('./Controllers/comment.controllers')

app.use(express.json())//added this to invoke middleware to parse

app.get('/api/topics', getTopics);

app.get('/api', getAllApis);

 
app.get('/api/articles/:article_id', getArticleById);

/*Q5*/
app.get('/api/articles', getAllArticlesOrderByCreatedAt);


/*Q6 */
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

// //Q7 - creates comment, adds it and returns comment to client

app.post('/api/articles/:article_id/comments', postCommentById)

/*Q8*/

app.patch('/api/articles/:article_id', patchArticleVotes);


//error handlers

app.use((_, response) => {
    response.status(404).send({msg: 'Nothing found'});
   
    
})

app.use((err,request,response,next)=>{
    if (err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg });
  } else if (err.code === '22P02') {
    response.status(400).send({ msg: 'Invalid request' });} 
else { next()}})


app.use((err,req,res,next)=>{
    res.status(500).send('Internal server error!')
    })




module.exports = app
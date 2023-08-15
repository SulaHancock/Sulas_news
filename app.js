const express = require('express')
const app = express()
/* don't need app.use(express.json()) yet as express does this, only need with post or patch requests*/
const { getTopics } = require('./db/Controllers/topics.controller')




app.get('/api/topics', getTopics)

/*error handling*/ 
app.use((_, response) => {
    response.status(404).send({msg: 'Nothing found'});
})
app.use((err,req,res,next)=>{
res.status(500).send('Internal server error')
})



module.exports = app
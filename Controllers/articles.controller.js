const fetchArticleById  = require('be-nc-news/Models/articles.models.js')

const getArticleById = (request, response, next)=>{
    const chosenID = request.params.article_id
    fetchArticleById(chosenID)
   
    .then((article)=>{ 
        response.status(200)
    .send({article})
    })
    .catch((err)=>{
        next(err)
       
    })
}



module.exports =  getArticleById 
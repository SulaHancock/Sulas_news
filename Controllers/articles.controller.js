const { fetchArticleById,  fetchAllArticles, fetchCommentsById } = require('be-nc-news/Models/articles.models.js')

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
/*Q5 */
const getAllArticlesOrderByCreatedAt = (request, response,next)=>{
    fetchAllArticles()
    .then((articles)=>{
        response.status(200)
        .send({articles})
    })
    .catch((err)=>{
        next(err)
    })

}
/*Q6*/
const getAllCommentsByArticleId = (request, repsonse, next)=>{
    const articleId = request.params.article_id;
    fetchCommentsByArticleId(articleId)
    .then((comments)=>{
        response.status(200)
        .send({comments})
    })
    .catch((err)=>{
        next(err)
    })
}



module.exports = { getArticleById, getAllArticlesOrderByCreatedAt, getAllCommentsByArticleId,}
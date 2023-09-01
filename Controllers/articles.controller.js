const { fetchArticleById,  fetchAllArticles, updateArticleVotes } = require('../Models/articles.models')

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

//Q8
const patchArticleVotes = (request, response, next) => {
    const { article_id } = request.params;
    let { inc_votes } = request.body;
    if (typeof inc_votes !== 'number') {
      return response.status(400).json({ msg: 'Invalid vote' });
    }
    Promise.all([fetchArticleById(article_id), updateArticleVotes(article_id, inc_votes)])
      .then((article) => {
        response.status(200).send({ article: article[1] });
      })
      .catch((err) => {
        next(err);
      });
  };
    

module.exports = { getArticleById, getAllArticlesOrderByCreatedAt, patchArticleVotes }

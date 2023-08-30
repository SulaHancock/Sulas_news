const { postComment, fetchCommentsByArticleId }  = require('be-nc-news/Models/comments.models.js')



/*Q6*/
const getCommentsByArticleId = (request, response, next) => {
    const { article_id } = request.params;
    fetchCommentsByArticleId(article_id)
      .then((comments) => {
        if (comments.length === 0){
            response.status(404).json({msg: "Nothing here"});
        } else{
        response.status(200).send(comments);
        }
    })
    
      .catch(next);
  };


//Q7
const postCommentById = (request, response, next)=>{
    const { article_id } = request.params; 
    const {body, username } = request.body 
    if (!body, !username) { 
      response.status(400)
      .send({msg: "Missing input"})
    } else { 
    return postComment(article_id, username, body)
    .then ((comment)=>{
      response.status(201)
      .send({comment: comment});
    }) 
    .catch((err)=>{
      console.log(err)
      next(err)
    })
  };
}

  

  module.exports = { postCommentById, getCommentsByArticleId }
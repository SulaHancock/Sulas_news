const db = require('be-nc-news/db/connection.js')
const format = require("pg-format")


  // Q6 
  const fetchCommentsByArticleId = (article_id) => {
    return db
    .query(`SELECT *
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC`, [article_id])
    .then((body) => {
        const {rows} = body
        return rows
    })
  }

//Q7
const postComment = (article_id, username, body )=>{ 
    const qry = format(
      `INSERT INTO comments (article_id, author, body) VALUES %L RETURNING *;`, [[article_id, username,body]]
    );  
    return db.query(qry).then((body)=>{
      const {rows} = body
      return rows
    })

    }


  


    module.exports = { postComment, fetchCommentsByArticleId }
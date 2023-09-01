const db = require('../db/connection')
const format = require("pg-format")



const fetchArticleById = (article_id)=>{
return db
.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
.then(({rows})=> {
    const article = rows[0];

if (rows.length === 0){
    return Promise.reject({
        status: 404,
        msg: "Nothing here",
    });
}
return article;
});
};


//Q5
const fetchAllArticles = ()=>{
        return db
        .query('SELECT articles.author, articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes,articles.article_img_url,COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;')
        .then(({rows})=>{
        return rows;
        });
        };

 //Q8


 const updateArticleVotes = (article_id, inc_votes) => {

    const queryString = 
        `UPDATE articles
        SET votes = votes + ${inc_votes}
        WHERE article_id = ${article_id}
        RETURNING *;`
   
    return db.query(queryString)
    .then(result => {
        return result.rows[0];
    });
};

module.exports = { fetchArticleById, fetchAllArticles, updateArticleVotes }

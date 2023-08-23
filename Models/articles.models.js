const db = require('be-nc-news/db/connection.js')

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

const fetchAllArticles = ()=>{
        return db
        .query('SELECT articles.author, articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes,articles.article_img_url,COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;')
        .then(({rows})=>{
        return rows;
        });
        };

    const fetchCommentsByArticleId= ()=>{
        return db
        .query('SELECT * FROM comments WHERE comment_id = $1 ORDER BY created_at DESC', [article_id])
        .then(({rows})=>{
            return rows;
        })
    }

    





module.exports = { fetchArticleById, fetchAllArticles, fetchCommentsByArticleId }
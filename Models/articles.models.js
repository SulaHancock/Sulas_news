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





module.exports = fetchArticleById 
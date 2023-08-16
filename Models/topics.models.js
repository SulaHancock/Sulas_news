
const db = require('be-nc-news/db/connection.js')


const fetchTopics = ()=>{
    const qryToGetTopics = "SELECT * FROM topics"
    return db.query(qryToGetTopics)
    .then(({rows})=>{
        return rows;
    })
}


module.exports = { fetchTopics }


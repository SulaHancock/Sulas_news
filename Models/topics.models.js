
const db = require('../db/connection')



const fetchTopics = ()=>{
    const qryToGetTopics = "SELECT * FROM topics"
    return db.query(qryToGetTopics)
    .then(({rows})=>{
        return rows;
    })
}


module.exports = { fetchTopics }


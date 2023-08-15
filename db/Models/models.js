
const db = require('../connection')

const fetchTopics = ()=>{
    const qry = "SELECT * FROM topics"
    return db.query(qry)
    .then(({rows})=>{
        return rows;
    })
}


/*how to edit fetchTopics so it can return 404 - or do I do that in controller file? what could we use? promise.reject goes in models*/

module.exports = { fetchTopics }


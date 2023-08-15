
const { fetchTopics } = require("../Models/models")

const getTopics = (request, response, next)=>{

    fetchTopics()
    .then((topics)=>{ response.status(200)
        .send({topics})
    }).catch((err)=>{
    })
}




module.exports =  { getTopics }
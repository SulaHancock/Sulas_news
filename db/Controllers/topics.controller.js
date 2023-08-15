
const { fetchTopics } = require("../Models/models")

const getTopics = (request, response, next)=>{

    fetchTopics()
    .then((topics)=>{ response.status(200)
        .send({topics})
     /* <--- passes err to app.js next? */
    }).catch((err)=>{
        console.log(err)

    })
}


module.exports =  { getTopics }
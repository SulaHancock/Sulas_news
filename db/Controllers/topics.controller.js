
const { fetchTopics, fetchAllApis } = require("../Models/models")
const jsonRequiredObj = require('be-nc-news/endpoints.json')

const getTopics = (request, response, next)=>{
     fetchTopics()
    .then((topics)=>{ response.status(200)
        .send({topics})
    }).catch((err)=>{
        next(err)
    })
}
 const getAllApis = (request, response, next)=>{
 response.status(200).send(jsonRequiredObj)
}







module.exports =  { getTopics, getAllApis }
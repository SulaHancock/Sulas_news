
const { fetchTopics } = require("../Models/topics.models")
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

const fetchAllApis = (request, response, next)=>{
    fetchByIds()
    .then((byIds)=>{response.status(200)})
    .send({byIds})
    .catch((err)=>{
    next(err)
})
}



module.exports =  { getTopics, getAllApis }
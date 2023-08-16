const app = require('../app');
const request = require('supertest');
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const db = require('../db/connection.js');
const jsonRequiredObj = require('be-nc-news/endpoints.json')

afterAll(()=>{
    return db.end();
})
beforeEach(()=>{
    return seed(data)
})

describe('/api/topics',()=>{
    test('responds with status of 200 and object with description and slug keys',()=>{
        return request(app).get('/api/topics').expect(200)
        .then((response)=>{
            const {topics} = response.body
            expect(topics.length).toBe(3)
            topics.forEach((topic)=>{
                expect(topic).toHaveProperty('description',expect.any(String));
                expect(topic).toHaveProperty('slug',expect.any(String));
            })
        })
    })
 
        })
describe('api/nothingThere - valid path, but nothing there', ()=>{
        test('status:404, responds with error message when passed an invalid input', () => {
            return request(app)
              .get('/api/nothingThere')
              .expect(404)
              .then(({ body }) => {
                expect(body.msg).toBe('Nothing found');
              });
          });
        });


        describe('/api responds with object of apis',()=>{
            test('responds with status of 200 and object with keys description, acceptable queries and example responses, ',()=>{
                return request(app).get('/api').expect(200)
                .then((response)=>{
                    // const jsonResponseObj = response.body
                    // expect(jsonResponseObj.length).toEqual(jsonRequiredObj.length)
                    // jsonResponseObj.forEach(({jsonObject})=>{ //this needs to be turned into an array so length can be counted and so forEach can run - do I do a for in loop?!
                    //     expect(jsonObject).toHaveProperty('description',expect.any(String));
                    //     expect(jsonObject).toHaveProperty('queries',expect.any(String));
                    //     expect(jsonObject).toHaveProperty('exampleResponse',expect.any(String));
                        expect(typeof response.body).toBe('object'); 
                        expect(response.body).toEqual(jsonRequiredObj)
                        // expect(response.body).toBe('jsonRequiredObj') /*wanting to check if response.body is the same as required file */
                    })
                })
            })
         
                // })

                // describe('/api/articles/:article_id',()=>{
                //     test('responds with status of 200 and object and responds with an artilce object',()=>{
                //         return request(app).get('/api/articles/:article_id').expect(200)
                //         .then((response)=>{
                //             const {byId} = response.body
                //             // const idLength = 
                //             // expect(byID.length).toBe()
                //             expect(typeof response.body).toBe('object'); 
                //           response.forEach((byId)=>{
                //             expect(byId).toHaveProperty('title',expect.any(String));     
                //             expect(byId).toHaveProperty('article_id',expect.any(String));
                //             expect(byId).toHaveProperty('author',expect.any(String));
                //             expect(byId).toHaveProperty('body',expect.any(String));
                //             expect(byId).toHaveProperty('topic',expect.any(String));
                //             expect(byId).toHaveProperty('created_at',expect.any(String));
                //             expect(byId).toHaveProperty('votes',expect.any(String));
                //             expect(byId).toHaveProperty('article_img_url',expect.any(String));
                //             })
                //         })
                //     }) 
                 
                //         })

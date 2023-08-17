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
                    expect(typeof response.body).toBe('object'); 
                    expect(response.body).toEqual(jsonRequiredObj)
   
                    })
                })
            })
         
            describe('/api/articles/:article_id',()=>{
                test('responds with status of 200 an article object with author, title, article_ID, body,topic, created_at, votes and article_img_url',()=>{
                    return request(app).get('/api/articles/1').expect(200)
                    .then((response)=>{
                        const { article } = response.body
                            expect(article).toHaveProperty('author',"butter_bridge");
                            expect(article).toHaveProperty('title',"Living in the shadow of a great man");
                            expect(article).toHaveProperty('article_id',1);
                            expect(article).toHaveProperty('body', "I find this existence challenging");
                            expect(article).toHaveProperty('topic',"mitch");
                            expect(article).toHaveProperty('created_at');
                            expect(article).toHaveProperty('votes',100);
                            expect(article).toHaveProperty('article_img_url',"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");

                        })
                    })
                })

                test('status:404, responds with an error message when passed a valid ID that doesnt exist', () => {
                    return request(app)
                      .get('/api/articles/500000')
                      .expect(404)
                      .then(({ body }) => {
                        expect(body.msg).toBe('Nothing here');
                      });
                  });
                  test('status 400, responds with an error message when passed an invalid ID type', ()=>{
                    return request(app)
                    .get('/api/articles/invalidRequest')
                    .expect(400)
                    .then(({body})=>{
                        expect(body.msg).toBe("Invalid request")
                    });
                  });

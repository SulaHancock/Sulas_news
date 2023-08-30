const app = require('../app');
const request = require('supertest');
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const db = require('../db/connection.js');
const jsonRequiredObj = require('/Users/sulahancock/Desktop/Northcoders/Backend/Sulas_news/endpoints.json');
// const articles = require('../db/data/test-data/articles'); //why is this ghosted out? surely it works if Q5 passes? - do we need lines 7 and 8 if we have line 3?
// const comments = require('../db/data/test-data/comments.js'); //is this not link to test data? why is it ghosted out?


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

                test('status:404, responds with an error message when passed a valid ID type, but that ID number doesnt exist', () => {
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

                  /*Q5*/describe('/api/articles/',()=>{
                    test('responds with status of 200 and an article object with title, article_id, topic, created_at,votes,article_img_url, comment_count',()=>{
                        return request(app).get('/api/articles').expect(200)
                        .then(({body})=>{
                            const articles  = body.articles;
                            expect(articles.length).toBe(13);
                            articles.forEach((article) => {
                                expect(article).toHaveProperty('author');
                                expect(article).toHaveProperty('title');
                                expect(article).toHaveProperty('article_id');
                                expect(article).toHaveProperty('topic');
                                expect(article).toHaveProperty('created_at');
                                expect(article).toHaveProperty('votes');
                                expect(article).toHaveProperty('article_img_url');
                                expect(article).toHaveProperty('comment_count');
                                expect(article).not.toHaveProperty('body');
                                 
                            })
                            })
                            })
                    })
                    test("should show the correct number of comment_count per article", () => {
                      return request(app)
                        .get("/api/articles")
                        .expect(200)
                        .then(({ body: { articles } }) => {
                          articles.forEach((article) => {
                            if (article.article_id === 1) {
                              expect(article.comment_count).toBe('11');//need to figure how to show as int and not string
                            }
                            if (article.article_id === 9) {
                              expect(article.comment_count).toBe('2');//need to figure how to show as int and not string
                            }
                          });
                        });
                    });


                    //Q6
                    describe('/api/articles/:article_id/comments', () => {
                        test('status 200 - responds with an array of comment object(s) with the correct properties', () => {
                          return request(app)
                            .get('/api/articles/1/comments')
                            .expect(200)
                            .then(({ body }) => {
                              body.forEach((comment) => {
                                expect(comment).toHaveProperty('comment_id');
                                expect(comment).toHaveProperty('votes');
                                expect(comment).toHaveProperty('created_at');
                                expect(comment).toHaveProperty('author');
                                expect(comment).toHaveProperty('body');
                                expect(comment).toHaveProperty('article_id');
                              });
                            });
                        });
                    })
                    test('status 200 - comments should be sorted by most recent first', () => {
                        return request(app)
                          .get('/api/articles/1/comments')
                          .expect(200)
                          .then(({ body }) => {
                            const comments = body;
                            for (let i = 0; i < comments.length - 1; i++) {
                              const currentComment = new Date(comments[i].created_at);
                              const nextComment = new Date(comments[i + 1].created_at);
                              expect(currentComment.getTime()).toBeGreaterThanOrEqual(
                                nextComment.getTime()
                              );
                            }
                          });
                      });

                      test('status:404, responds with an error message when passed a valid ID that doesnt exist', () => {
                        return request(app)
                          .get('/api/articles/7000/comments')
                          .expect(404)
                          .then(({ body }) => {
                            expect(body.msg).toBe('Nothing here');
                          });
                      });
                      test('status 400, responds with an error message when passed an invalid ID type', ()=>{
                        return request(app)
                        .get('/api/articles/invalidRequest/comments')
                        .expect(400)
                        .then(({body})=>{
                            expect(body.msg).toBe("Invalid request")
                        });                
                      });
                      test("status: 200, responds with empty array when article comments are 0", ()=>{
                        return request(app)
                        .get('/api/articles/2/comments')
                        .expect(200)
                        .then(({body})=>{
                          expect(body).toBe([])
                        })
                      })
                     
//Q7
describe.only("POST /api/articles/:article_id/comments", () => {
  test("Status 201 -  accept a comment for article and responds with the posted comment", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({ username: "butter_bridge", body: "Here I am posting something" })
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment).toHaveProperty('comment_id');
        expect(comment).toHaveProperty('votes');
        expect(comment).toHaveProperty('created_at');
        expect(comment).toHaveProperty('author');
        expect(comment).toHaveProperty('body');
        expect(comment).toHaveProperty('article_id');
        
      })
  });
})

     
 /*Q8*/
describe(('PATCH /api/articles/:article_id'), () => {
  test('status 200 : increments vote by 1', () => {
      return request(app)
      .patch('/api/articles/1')
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({body}) => {
          expect(body.article.votes).toBe(101);
      });
  });
  test('status 400, responds with error message when passed an article_id that does not exisit', ()=>{
    return request(app)
    .get('/api/articles/6000')
    .expect(404)
    .then(({ body })=>{
      expect(body.msg).toBe('Nothing here')
    })
  })
  test('status 400, responds with an error message when passed an invalid ID type', ()=>{
    return request(app)
    .get('/api/articles/fishsticks')
    .expect(400)
    .then(({body})=>{
        expect(body.msg).toBe("Invalid request")
    });                
  })
})



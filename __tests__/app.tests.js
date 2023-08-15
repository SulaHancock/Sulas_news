const app = require('../app');
const request = require('supertest');
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const db = require('../db/connection.js');

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

       
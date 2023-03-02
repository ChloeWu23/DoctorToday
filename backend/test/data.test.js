const supertest = require("supertest");
const assert = require('assert');
const app = require("../app");

describe("GET /", function() {
    it("get data from serviceOverview", function(done) {
      supertest(app)
        .get("/service")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
});

describe("GET /", function() {
    it("get data from sub service", function(done) {
      supertest(app)
        .get("/service/0")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
});

describe("GET /", function() {
    it("get data from FAQ", function(done) {
      supertest(app)
        .get("/faq")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
});

describe("GET /", function() {
    it("get data from other-info", function(done) {
      supertest(app)
        .get("/other-info")
        .send({ 
            "info_type": "admin-name"
        })
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
});

describe("GET /", function() {
    it("get data from people", function(done) {
      supertest(app)
        .get("/people")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
});

describe("GET /", function() {
    it("get data from news", function(done) {
      supertest(app)
        .get("/news")
        .expect(200)
        .end(function(err, res){
          if (err) done(err);
          done();
        });
    });
});

describe("GET /", function() {
  it("get data from news", function(done) {
    supertest(app)
      .get("/news")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("POST /", function() {
  it("Admin Portal Login", function(done) {
    supertest(app)
      .post("/other-info/login")
      .send({ 
          "username": "admin",
          "password": "123admin"
      })
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});


// describe("POST /", function(){
//     it("it shoud return status code 200 is name exists", function(done) {
//       supertest(app)
//         .post("/faq")
//         .send({ 
//             "question": "1+3 = ?",
//             "answer": "8"
//         })
//         .expect(200, done);
//     });
//   });
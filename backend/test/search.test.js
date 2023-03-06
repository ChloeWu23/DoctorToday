const supertest = require("supertest");
const assert = require('assert');
const app = require("../app");
const { GetBucketOwnershipControlsOutputFilterSensitiveLog } = require("@aws-sdk/client-s3");

describe("keywordSearch API", function () {
  it("returns filtered data when given keywords connected by -", function (done) {
    supertest(app)
      .get("/keywordSearch/travel")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        assert(Array.isArray(res.body), 'Response body should be an array');
        assert(res.body.length >= 2, 'Response body should have at least 2 items');
        done();
      });
  });
});
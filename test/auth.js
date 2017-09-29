const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(server);

const User = require('../models/user.model');

// login
describe('User', function() {
    it('should not be able to login if they have not registered', function (done) {
        agent
            .post('/login', { username: "pygnasak", password: "password" })
            .end(function (err, res){
                res.status.should.be.equal(401);
                done();
            });

    });
});

// signup
it('should be able to signup', function (done) {
    User.findOneAndRemove({ username: "testone" }, function() {
        agent
            .post('/sign-up')
            .send({ username: "testone", password: "password" })
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.have.cookie("nToken");
                done();
            });
    });
});

// login
it('should be able to logout', function (done) {
    agent
        .get('/logout')
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.not.have.cookie("nToken");
            done();
        });
});

// login
it('should be able to login', function (done) {
    agent
        .post('/login')
        .send({ email: "username", password: "password" })
        .end(function (err, res) {
            res.should.have.status(200);
            res.should.have.cookie("nToken");
            done();
        });
});

// test/posts.js
before(function (done) {
    agent
        .post('/login')
        .send({ username: "testone", password: "password" })
        .end(function (err, res) {
            done();
        });
});
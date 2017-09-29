const chai = require('chai'),
    chaiHttp = require('chai-http');

let should = chai.should();

chai.use(chaiHttp);

describe('Site', () => {
    it('should have a site home page', (done) => {
        chai.request('localhost:3000')
            .get('/')
            .end(function (err, res){
                res.status.should.be.equal(200);
                done();
            });
    });
});


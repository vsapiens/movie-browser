const app = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(chaiHttp);

describe('Movie API', () => {
  describe('GET /movies', () => {
    it('should return a list of movies', (done) => {
      chai
        .request(app)
        .get('/movies')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /movies/:id', () => {
    it('should return a specific movie by ID', (done) => {
      chai
        .request(app)
        .get('/movies/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id').eql(1);
          done();
        });
    });

    it('should return 404 for a non-existing movie ID', (done) => {
      chai
        .request(app)
        .get('/movies/999')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

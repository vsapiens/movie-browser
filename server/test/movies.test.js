const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');

describe('Movie API', () => {
  describe('GET /movies', () => {
    it('should return paginated movie data with metadata', async () => {
      const res = await request(app).get('/movies');
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data').that.is.an('array');
      expect(res.body).to.have.property('page', 1);
      expect(res.body).to.have.property('pageSize', 10);
      expect(res.body).to.have.property('total').that.is.a('number');
      expect(res.body).to.have.property('totalPages').that.is.a('number');
    });

    it('should return all movies when pageSize is large enough', async () => {
      const res = await request(app).get('/movies?pageSize=100');
      expect(res.status).to.equal(200);
      expect(res.body.data.length).to.equal(res.body.total);
    });

    it('should paginate correctly with page and pageSize', async () => {
      const res = await request(app).get('/movies?page=1&pageSize=2');
      expect(res.status).to.equal(200);
      expect(res.body.data.length).to.equal(2);
      expect(res.body.page).to.equal(1);
      expect(res.body.pageSize).to.equal(2);
    });

    it('should return empty array for page beyond available data', async () => {
      const res = await request(app).get('/movies?page=999');
      expect(res.status).to.equal(200);
      expect(res.body.data).to.be.an('array').that.is.empty;
    });

    it('should return each movie with expected fields', async () => {
      const res = await request(app).get('/movies');
      const movie = res.body.data[0];
      expect(movie).to.have.all.keys('id', 'title', 'director', 'releaseYear', 'description', 'rating', 'genre');
    });

    // --- Validation error cases ---

    it('should return 400 for page=0', async () => {
      const res = await request(app).get('/movies?page=0');
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
      expect(res.body).to.have.property('message').that.is.a('string');
    });

    it('should return 400 for negative page', async () => {
      const res = await request(app).get('/movies?page=-1');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid page parameter');
    });

    it('should return 400 for non-numeric page', async () => {
      const res = await request(app).get('/movies?page=abc');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid page parameter');
    });

    it('should return 400 for decimal page', async () => {
      const res = await request(app).get('/movies?page=1.5');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid page parameter');
    });

    it('should return 400 for pageSize=0', async () => {
      const res = await request(app).get('/movies?pageSize=0');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid pageSize parameter');
    });

    it('should return 400 for negative pageSize', async () => {
      const res = await request(app).get('/movies?pageSize=-5');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid pageSize parameter');
    });

    it('should return 400 for non-numeric pageSize', async () => {
      const res = await request(app).get('/movies?pageSize=xyz');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid pageSize parameter');
    });

    it('should return 400 for pageSize exceeding 100', async () => {
      const res = await request(app).get('/movies?pageSize=101');
      expect(res.status).to.equal(400);
      expect(res.body.message).to.include('must not exceed 100');
    });
  });

  describe('GET /movies/:id', () => {
    it('should return a specific movie by ID', async () => {
      const res = await request(app).get('/movies/1');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('title').that.is.a('string');
    });

    it('should return all expected fields for a movie', async () => {
      const res = await request(app).get('/movies/1');
      expect(res.body).to.have.all.keys('id', 'title', 'director', 'releaseYear', 'description', 'rating', 'genre');
    });

    it('should return 404 for a non-existing movie ID', async () => {
      const res = await request(app).get('/movies/999');
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error', 'Movie not found');
      expect(res.body).to.have.property('message').that.includes('999');
    });

    it('should return 400 for non-numeric ID', async () => {
      const res = await request(app).get('/movies/abc');
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error', 'Invalid movie ID');
      expect(res.body.message).to.include('abc');
    });

    it('should return 400 for negative ID', async () => {
      const res = await request(app).get('/movies/-1');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid movie ID');
    });

    it('should return 400 for decimal ID', async () => {
      const res = await request(app).get('/movies/1.5');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid movie ID');
    });

    it('should return 400 for zero ID', async () => {
      const res = await request(app).get('/movies/0');
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('Invalid movie ID');
    });
  });

  describe('Error response format', () => {
    it('should include both error and message fields in 400 responses', async () => {
      const res = await request(app).get('/movies/abc');
      expect(res.status).to.equal(400);
      expect(res.body).to.have.all.keys('error', 'message');
      expect(res.body.error).to.be.a('string');
      expect(res.body.message).to.be.a('string');
    });

    it('should include both error and message fields in 404 responses', async () => {
      const res = await request(app).get('/movies/999');
      expect(res.status).to.equal(404);
      expect(res.body).to.have.all.keys('error', 'message');
    });

    it('should provide user-friendly messages in error responses', async () => {
      const res = await request(app).get('/movies?page=abc');
      expect(res.body.message).to.match(/positive integer/i);
    });
  });
});

const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../config/database');

beforeAll(async () => {
  await sequelize.sync();
});

describe('Book CRUD operations', () => {
  test('POST /api/clubs/:clubId/books - should create a new book', async () => {
    const response = await request(app)
      .post('/api/clubs/1/books')
      .send({ title: 'Book Title', author: 'Author Name' });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Book Title');
  });

  test('GET /api/clubs/:clubId/books - should return all books of a club', async () => {
    const response = await request(app).get('/api/clubs/1/books');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('PUT /api/books/:id - should update book details', async () => {
    const response = await request(app)
      .put('/api/books/1')
      .send({ title: 'Updated Title', author: 'Updated Author' });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });

  test('DELETE /api/books/:id - should delete a book', async () => {
    const response = await request(app).delete('/api/books/1');
    expect(response.status).toBe(204);
  });
});

afterAll(async () => {
  await sequelize.close();
});

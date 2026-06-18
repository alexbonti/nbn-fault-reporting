const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('returns 200 with service status', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('NBN Fault Reporting API');
    expect(res.body.timestamp).toBeDefined();
  });
});

describe('Unknown routes', () => {
  it('returns 404 for undefined GET routes', async () => {
    const res = await request(app).get('/undefined-route');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('NOT_FOUND');
  });

  it('returns 404 for undefined POST routes', async () => {
    const res = await request(app).post('/not-a-route');

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('NOT_FOUND');
  });
});

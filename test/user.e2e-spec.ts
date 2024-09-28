import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/:id (GET)', () => {
    it('', () => {
      return request(app.getHttpServer()).get('/1').expect(200).expect('');
    });
  });

  describe('/user (POST)', () => {
    it('', () => {
      return request(app.getHttpServer()).post('/').expect(201).expect('');
    });
  });

  describe('/:id (PUT)', () => {
    it('', () => {
      return request(app.getHttpServer()).put('/1').expect(204).expect('');
    });
  });

  describe('/:id/password/:password (PUT)', () => {
    it('', () => {
      return request(app.getHttpServer())
        .put('/1/password/123')
        .expect(204)
        .expect('');
    });
  });

  describe('/:id/email/:email (PUT)', () => {
    it('', () => {
      return request(app.getHttpServer()).put('/').expect(204).expect('');
    });
  });

  describe('/:id (DELETE)', () => {
    it('', () => {
      return request(app.getHttpServer()).delete('/1').expect(204);
    });
  });
});

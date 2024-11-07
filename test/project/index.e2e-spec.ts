import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { companyFactory, projectFactory } from 'test/factory';
import { Sequelize } from 'sequelize';

describe('ProjectController (e2e)', () => {
  let app: INestApplication;
  let sequelize: Sequelize;
  let transaction;
  let authToken;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        errorHttpStatusCode: 422,
        enableDebugMessages: true,
      }),
    );
    await app.init();

    sequelize = app.get(Sequelize);

    const token = 'fodase';

    authToken = [token, { type: 'Bearer' }];
  });

  beforeEach(async () => {
    transaction = await sequelize.transaction();
  });

  it('/projects/companies/:company_id (GET)', async () => {
    const company = await companyFactory.create({
      id: '9c3b3b3b-1b1b-4b1b-9b1b-1b1b1b1b1b1b',
    });
    await projectFactory.createMany(5, {
      company: company,
    });
    return request(app.getHttpServer())
      .auth(authToken)
      .get(`/projects/company/${company.id}`)
      .expect(200);
  });

  it('/projects/:id (GET)', async () => {
    const project = await projectFactory.create({
      id: '9c3b3b3b-1b1b-4b1b-9b1b-1b1b1b1b1b1b',
    });
    return request(app.getHttpServer())
      .get(`/projects/${project.id}`)
      .expect(200);
  });

  it('/projects (POST)', () => {
    const project = projectFactory.build();
    return request(app.getHttpServer())
      .post('/projects')
      .send(project)
      .expect(201);
  });

  it('/projects/:id (PUT)', () => {
    return request(app.getHttpServer()).put('/projects/1234567890').expect(204);
  });

  it('/projects/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/projects/1234567890')
      .expect(200);
  });

  afterEach(async () => {
    await transaction.rollback();
  });

  afterAll(async () => {
    await app.close();
  });
});

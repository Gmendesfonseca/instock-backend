import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { tagFactory } from 'test/factory';
import { User } from 'src/user/user.model';

describe('TagController (e2e)', () => {
  let app: INestApplication;
  let companyUser: User;
  let product: Product;

  beforeEach(async () => {
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

    await tagFactory.create({
      rfid: '1234567890',
      product_id: product.id,
      company_id: companyUser.id,
    });
  });

  it('/tag/:rfid (GET)', () => {
    return request(app.getHttpServer()).get('/tag/1234567890').expect(200);
  });

  it('/tag/products/:product_id (GET)', () => {
    return request(app.getHttpServer())
      .get('/tag/products/1234567890')
      .expect(200);
  });

  it('/tag/companies/:company_id (GET)', () => {
    return request(app.getHttpServer())
      .get('/tag/company/1234567890')
      .expect(200);
  });

  it('/tag (POST)', () => {
    return request(app.getHttpServer()).post('/tag').expect(201);
  });

  it('/tag/:rfid (PUT)', () => {
    return request(app.getHttpServer()).put('/tag/1234567890').expect(204);
  });

  it('/tag/:rfid (DELETE)', () => {
    return request(app.getHttpServer()).delete('/tag/1234567890').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from 'src/Services/app.service';
import { DataSource } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { AuthDto } from 'src/DTO/Auth/AuthDTO';
import { response } from 'express';

jest.mock('typeorm');
jest.mock('jsonwebtoken');
jest.mock('express', () => ({
  response: {
    json: jest.fn(),
  },
}));

describe('AppService', () => {
  let appService: AppService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: DataSource,
          useValue: {
            getRepository: jest.fn().mockReturnValue({
              createQueryBuilder: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getOne: jest.fn(),
            }),
          },
        },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    dataSource = module.get<DataSource>(DataSource);
  });

  describe('authenticate', () => {
    it('should return a valid token for valid credentials', async () => {
      const user = {
        id: '1',
        email: 'test@gmail.com',
        name: 'Test',
        lastName: 'User',
        isActive: true,
      };
      const authDto: AuthDto = {
        email: 'test@gmail.com',
        password: '12345678',
      };
      const token = 'valid_token';

      jest
        .spyOn(appService, 'validateAuth' as never)
        .mockResolvedValue(user as never);
      jest.spyOn(jwt, 'sign').mockReturnValue(token as never);

      process.env.JWT_SECRET_KEY = 'secret';
      process.env.JWT_EXPIRES_IN = '1d';

      await appService.authenticate(authDto);

      expect(response.json).toHaveBeenCalledWith({
        token_type: 'Bearer',
        access_token: token,
        expires_in: '1d',
      });
    });

    it('should return "Invalid credentials" for invalid credentials', async () => {
      const authDto: AuthDto = {
        email: 'invalid@gmail.com',
        password: 'wrongpassword',
      };

      jest
        .spyOn(appService, 'validateAuth' as never)
        .mockResolvedValue('Invalid credentials' as never);

      const result = await appService.authenticate(authDto);

      expect(result).toBe('Invalid credentials');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { Request } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            me: jest.fn(),
            authenticate: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('me', () => {
    it('should call authService.me with the correct parameters', () => {
      const request = { auth: 'auth_token' } as unknown as Request;
      authController.me(request);
      expect(authService.me).toHaveBeenCalledWith('auth_token');
    });
  });

  describe('authenticate', () => {
    it('should call authService.authenticate with the correct parameters', () => {
      const authDto: AuthenticateDto = {
        email: 'test@gmail.com',
        password: '12345678',
      };
      authController.authenticate(authDto);
      expect(authService.authenticate).toHaveBeenCalledWith(authDto);
    });
  });
});

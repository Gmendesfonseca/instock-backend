import { JwtService } from '@nestjs/jwt';
import { UserRepositoryInterface } from 'src/user/interfaces/user.repository.interface';
import { AuthRepositoryInterface } from './interfaces/auth.repository.interface';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: jest.Mocked<AuthRepositoryInterface.AuthRepository>;
  let jwtService: jest.Mocked<JwtService>;
  let userRepository: jest.Mocked<UserRepositoryInterface.UserRepository>;

  beforeEach(() => {
    authRepository = {
      findOne: jest.fn(),
    } as any;

    jwtService = {
      sign: jest.fn(),
    } as any;

    userRepository = {
      findOne: jest.fn(),
    } as any;

    authService = new AuthService(authRepository, jwtService, userRepository);
  });

  describe('me', () => {
    it('should return user details when user is found', async () => {
      const user = {
        id: '1',
        name: 'testuser',
        email: 'test@gmail.com',
        password: '12345678',
        type: 'PERSON',
      };
      const userModel = {
        id: '1',
        username: 'testuser',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      userRepository.findOne.mockResolvedValue(userModel);

      const result = await authService.me({ user });

      expect(result).toEqual({
        user_id: user.id,
        username: userModel.username,
        name: null,
        social_name: null,
        logo: null,
        type: 'PERSON',
        avatar: null,
        cover: null,
        user_config: expect.any(Object),
        profile_config: expect.any(Object),
        redirects: [],
        companies: expect.any(Array),
      });
    });

    it('should return null when user is not found', async () => {
      const user = {
        id: '1',
        name: 'testuser',
        email: 'test@gmail.com',
        password: '12345678',
        type: 'PERSON',
      };
      userRepository.findOne.mockResolvedValue(null);

      const result = await authService.me({ user });

      expect(result).toBeNull();
    });
  });

  describe('authenticate', () => {
    it('should return auth details when authentication is successful', async () => {
      const authDto = {
        email: 'test@gmail.com',
        password: 'password',
      };
      const auth = { userId: '1' };
      const user = {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        person: true,
        company: false,
      };
      authRepository.findOne.mockResolvedValue(auth);
      userRepository.findOne.mockResolvedValue(user);
      jwtService.sign.mockReturnValue('signed-token');

      const result = await authService.authenticate(authDto);

      expect(result).toEqual({
        access_token: 'signed-token',
        token_type: 'Bearer',
        expires_in: process.env.JWT_EXPIRES_IN,
      });
    });

    it('should return null when auth is not found', async () => {
      const authDto = { username: 'testuser', password: 'password' };
      authRepository.findOne.mockResolvedValue(null);

      const result = await authService.authenticate(authDto);

      expect(result).toBeNull();
    });

    it('should return null when user is not found', async () => {
      const authDto = { username: 'testuser', password: 'password' };
      const auth = { userId: '1' };
      authRepository.findOne.mockResolvedValue(auth);
      userRepository.findOne.mockResolvedValue(null);

      const result = await authService.authenticate(authDto);

      expect(result).toBeNull();
    });
  });
});

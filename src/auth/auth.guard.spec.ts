import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  const mockJwtService = {
    verifyAsync: jest.fn(),
  };

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  const mockExecutionContext = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({
        headers: {},
        auth: null,
      }),
    }),
    getClass: jest.fn(),
    getHandler: jest.fn(),
  } as unknown as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        { provide: JwtService, useValue: mockJwtService },
        { provide: Reflector, useValue: mockReflector },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
  

  it('should return true for a valid token', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    const mockRequest = mockExecutionContext.switchToHttp().getRequest();
    mockRequest.headers.authorization = 'Bearer validToken';

    const mockPayload = { userId: '123', role: 'user' };
    mockJwtService.verifyAsync.mockResolvedValueOnce(mockPayload);

    const result = await authGuard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
    expect(mockRequest.auth).toEqual(mockPayload);
  });

  it('should allow access to public routes', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(true);

    const result = await authGuard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException if token is missing', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    const mockRequest = mockExecutionContext.switchToHttp().getRequest();
    mockRequest.headers.authorization = undefined;

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      new UnauthorizedException({
        code: 401,
        icTrace: 'T001',
        message: 'Auth?',
      }),
    );
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    const mockRequest = mockExecutionContext.switchToHttp().getRequest();
    mockRequest.headers.authorization = 'Bearer invalidToken';

    mockJwtService.verifyAsync.mockRejectedValueOnce(
      new Error('Invalid token'),
    );

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      new UnauthorizedException({
        code: 401,
        icTrace: 'T002',
        message: 'Token Invalid',
      }),
    );
  });

  it('should throw UnauthorizedException if token is expired', async () => {
    mockReflector.getAllAndOverride.mockReturnValue(false);
    const mockRequest = mockExecutionContext.switchToHttp().getRequest();
    mockRequest.headers.authorization = 'Bearer expiredToken';

    const expiredError = new Error('Token expired');
    expiredError.name = 'TokenExpiredError';
    mockJwtService.verifyAsync.mockRejectedValueOnce(expiredError);

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      new UnauthorizedException({
        code: 401,
        icTrace: 'T003',
        message: 'Token Invalid',
      }),
    );
  });
});

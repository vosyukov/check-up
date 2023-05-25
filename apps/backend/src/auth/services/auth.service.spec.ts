import { Test } from '@nestjs/testing';

import { UserService } from '../../user/services/user.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../user/entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService, { provide: UserService, useValue: { getUser: jest.fn(), register: jest.fn() } }, { provide: JwtService, useValue: { sign: jest.fn() } }],
    }).compile();

    authService = module.get(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  describe('register', () => {
    let result: string;

    beforeEach(async () => {
      jest.spyOn(userService, 'register').mockResolvedValueOnce({ id: 'id', email: 'email' } as UserEntity);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('sign');

      result = await authService.register('test@test.test', 'pas');
    });

    it('must register user', () => {
      expect(userService.register).toHaveBeenCalledTimes(1);
      expect(userService.register).toHaveBeenCalledWith('test@test.test', 'pas');
    });

    it('must sign payload', () => {
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith({ email: 'email', userId: 'id' }, { expiresIn: '30d' });
    });

    it('must return token', () => {
      expect(result).toBe('sign');
    });
  });

  describe('login', () => {
    let result: string;

    beforeEach(async () => {
      jest.spyOn(userService, 'getUser').mockResolvedValueOnce({ id: 'id', email: 'email', password:'pas' } as UserEntity);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('sign');

      result = await authService.login('test@test.test', 'pas');
    });

    it('must fetch user', () => {
      expect(userService.getUser).toHaveBeenCalledTimes(1);
      expect(userService.getUser).toHaveBeenCalledWith({"email": "test@test.test"});
    });

    it('must sign payload', () => {
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(jwtService.sign).toHaveBeenCalledWith({ email: 'email', userId: 'id' }, { expiresIn: '30d' });
    });

    it('must return token', () => {
      expect(result).toBe('sign');
    });
  })
});

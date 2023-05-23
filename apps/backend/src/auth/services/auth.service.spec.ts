import { Test } from '@nestjs/testing';

import { UserService } from '../../user/services/user.service';
import { AuthService } from './auth.service';

describe('dssdffd sdff', () => {
  console.log('userService');
  let authService: AuthService;
  let userService: UserService;
  beforeEach(async () => {
    console.log('userService');
    const module = await Test.createTestingModule({
      providers: [AuthService, { provide: UserService, useValue: {} }],
    }).compile();

    authService = module.get(AuthService);
    userService = module.get(UserService);

    console.log(userService);
  });

  describe('sdf', () => {
    let result;
    beforeEach(async () => {
      // jest.spyOn(userService, 'getUser').mockResolvedValueOnce({} as never)
      result = await authService.register('test@test.test', 'pas');
    });

    it('fsd', () => {
      expect(result).toStrictEqual(1);
    });
  });
});

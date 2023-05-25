import {HttpException, Injectable} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.getUser({
      email,
    });

    if (user && user.password === password) {
      const payload = {
        userId: user.id,
        email: user.email,

      };
      return this.jwtService.sign(payload, { expiresIn: '30d',});
    } else {
      throw new Error('User not found');
    }
  }

  public async register(email: string, password: string): Promise<string> {
    const user = await this.userService.register(email, password);

    const payload = {
      userId: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, { expiresIn: '30d',});
  }
}

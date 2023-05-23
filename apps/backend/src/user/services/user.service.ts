import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

export interface UserFilter {
  id?: string;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  public async register(email: string, password: string): Promise<UserEntity> {
    const isExistUser = Boolean(
      await this.userRepository.count({
        where: {
          email,
        },
      })
    );

    if (isExistUser) {
      throw 'err';
    } else {
      const user = await this.userRepository.save({
        email,

        password,
      });
      return user;
    }
  }

  public async getUser(filter: UserFilter): Promise<UserEntity | undefined> {
    let condition: FindOptionsWhere<UserEntity> = {};

    if (filter.id) {
      condition = {
        ...condition,
        id: filter.id,
      };
    }
    if (filter.email) {
      condition = {
        ...condition,
        email: filter.email,
      };
    }
    const user = await this.userRepository.findOne({
      where: condition,
    });

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

type UserRes = {
  id: number;
  email: string;
  name: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async findOneData(email: string): Promise<UserRes> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    const res = { id: user.id, email: user.email, name: user.name };
    return res;
  }
}

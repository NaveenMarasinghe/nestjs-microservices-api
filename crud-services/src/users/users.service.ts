import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from './interfaces/IUser';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async findOneUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new RpcException('User not found');
    }
    return user;
  }
  async addNewUser(data: CreateUserDto): Promise<IUser> {
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;

    return await this.usersRepository.save(user);
  }
  async updateUser(data: UpdateUserDto): Promise<IUser> {
    console.log(data);
    const result = await this.usersRepository
      .createQueryBuilder()
      .update({
        email: data.email,
        password: data.password,
        name: data.name,
      })
      .where({
        id: data.id,
      })
      .returning('*')
      .execute();

    return await result.raw[0];
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete({ id: id });
    return { response: 'Success' };
  }
}

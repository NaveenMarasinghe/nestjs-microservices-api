import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './dto/IUser';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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
    return user;
  }
  async addNewUser(data: IUser): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.name = data.name;
    user.password = data.password;

    return await this.usersRepository.save(user);
  }
  async updateUser(data: User, id: number): Promise<User> {
    const result = await this.usersRepository
      .createQueryBuilder()
      .update({
        email: data.email,
        password: data.password,
        name: data.name,
      })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return await result.raw[0];
  }

  async deleteUser(data: number) {
    await this.usersRepository.delete({ id: data });
    return { response: 'Success' };
  }
}

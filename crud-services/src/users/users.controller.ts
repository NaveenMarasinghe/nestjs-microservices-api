import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { IUser } from './interfaces/IUser';

export type UserById = {
  id: number;
};

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('CrudService', 'FindOne')
  findOneUser(data: UserById) {
    return this.usersService.findOneUser(data.id);
  }

  @GrpcMethod('CrudService', 'AddNewUser')
  addNewUser(data: any): Promise<IUser> {
    return this.usersService.addNewUser(data.newUser);
  }

  @GrpcMethod('CrudService', 'UpdateUser')
  updateUser(data: any): Promise<IUser> {
    return this.usersService.updateUser(data);
  }

  @GrpcMethod('CrudService', 'DeleteUser')
  deleteUser(data: UserById) {
    return this.usersService.deleteUser(data.id);
  }
}

import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UsersService } from './users.service';
import { IUser } from './dto/IUser';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

export type UserById = {
  id: number;
  token: string;
};

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('CrudService', 'FindOne')
  findOneUser(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.usersService.findOneUser(data.id, data.token);
  }

  @UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'AddNewUser')
  addNewUser(data: IUser, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return this.usersService.addNewUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'UpdateUser')
  updateUser(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return this.usersService.updateUser(data.user, data.id);
  }

  @UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'DeleteUser')
  deleteUser(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.usersService.deleteUser(data.id);
  }
}

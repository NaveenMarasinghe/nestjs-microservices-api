import { Controller, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UsersService } from './users.service';

export type UserById = {
  id: number;
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
    return this.usersService.findOneUser(data.id);
  }

  //@UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'AddNewUser')
  addNewUser(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return this.usersService.addNewUser(data.newUser);
  }

  //@UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'UpdateUser')
  updateUser(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    return this.usersService.updateUser(data);
  }

  //@UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'DeleteUser')
  deleteUser(
    data: UserById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.usersService.deleteUser(data.id);
  }
}

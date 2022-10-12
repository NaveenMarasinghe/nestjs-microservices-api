import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UsersService } from './users.service';

export type UserById = {
  id: number;
};

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @MessagePattern('createUser')
  // create(@Payload() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @MessagePattern('findAllUsers')
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @GrpcMethod('CrudService', 'FindOneUser')
  findOne(data: UserById, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    //return { id: 1, name: 'john' };
    return this.usersService.findOne(data.id);
  }

  // @MessagePattern('updateUser')
  // update(@Payload() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(updateUserDto.id, updateUserDto);
  // }

  // @MessagePattern('removeUser')
  // remove(@Payload() id: number) {
  //   return this.usersService.remove(id);
  // }
}

import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface UserService {
  findOne(data: { id: number; token: string }): Observable<any>;
  addNewUser(data: { newUser: CreateUserDto; token: string }): Observable<any>;
  updateUser(data: {
    updateUser: CreateUserDto;
    token: string;
  }): Observable<any>;
  deleteUser(data: { id: number; token: string }): Observable<any>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UserService;

  constructor(@Inject('CRUD_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UserService>('CrudService');
  }

  getOneUser(id: number, jwt): Observable<string> {
    console.log('jwt', jwt);
    return this.usersService.findOne({ id: id, token: jwt });
  }

  addNewUser(data: CreateUserDto, jwt: string): Observable<string> {
    return this.usersService.addNewUser({ newUser: data, token: jwt });
  }

  updateUser(data: CreateUserDto, jwt: string): Observable<string> {
    return this.usersService.updateUser({ updateUser: data, token: jwt });
  }
  deleteUser(id: number, jwt: string): Observable<string> {
    return this.usersService.deleteUser({ id: id, token: jwt });
  }
}

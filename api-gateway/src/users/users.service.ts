import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ViewUserDto } from './dto/view-user.dto';

interface UserService {
  findOne(data: { id: number }): Observable<any>;
  addNewUser(data: CreateUserDto): Observable<any>;
  updateUser(data: ViewUserDto): Observable<any>;
  deleteUser(data: { id: number }): Observable<any>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UserService;

  constructor(@Inject('CRUD_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UserService>('CrudService');
  }

  getOneUser(id: number): Observable<string> {
    return this.usersService.findOne({ id: id });
  }

  addNewUser(data: CreateUserDto): Observable<string> {
    return this.usersService.addNewUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  }

  updateUser(data: ViewUserDto): Observable<string> {
    return this.usersService.updateUser({
      name: data.name,
      email: data.email,
      password: data.password,
      id: data.id,
    });
  }

  deleteUser(id: number): Observable<string> {
    return this.usersService.deleteUser({ id: id });
  }
}

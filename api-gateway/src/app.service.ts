import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UsersService {
  findOneUser(data: { id: number }): Observable<any>;
}

@Injectable()
export class AppService implements OnModuleInit {
  private usersService: UsersService;

  constructor(@Inject('CRUD_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('CrudService');
  }

  getUser(): Observable<string> {
    return this.usersService.findOneUser({ id: 1 });
  }
}

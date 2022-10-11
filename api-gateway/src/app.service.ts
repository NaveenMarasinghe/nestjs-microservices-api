import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UsersService {
  findOne(data: { id: number }): Observable<any>;
}

@Injectable()
export class AppService implements OnModuleInit {
  private usersService: UsersService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersService>('UsersService');
  }

  getUser(): Observable<string> {
    return this.usersService.findOne({ id: 1 });
  }
}

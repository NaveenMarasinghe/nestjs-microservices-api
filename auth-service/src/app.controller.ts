import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Role } from './auth/role.enum';
import { Roles } from './auth/roles.decorator';
import { CustomLocalAuthGuard } from './auth/guards/auth.guard';
import { UsersService } from './users/users.service';

export type AuthData = {
  email: string;
  passoword: string;
};

export type GetUserData = {
  token: string;
  email: string;
};

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(CustomLocalAuthGuard)
  @GrpcMethod('AuthService', 'LoginUser')
  async login(data: AuthData) {
    return this.authService.login(data.email);
  }

  @UseGuards(JwtAuthGuard)
  @GrpcMethod('AuthService', 'GetUser')
  async profile(
    data: AuthData,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.usersService.findOneData(data.email);
  }
}

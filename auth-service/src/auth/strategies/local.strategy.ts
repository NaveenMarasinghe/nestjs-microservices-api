import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser('admin@gmail.com', '123');
    //const user = { email: 'admin@gmail.com', id: 1, password: '123' };
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return user;
  }
}

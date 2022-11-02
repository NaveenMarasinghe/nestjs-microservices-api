import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const { token } = context.switchToHttp().getRequest();
    if (!token) {
      throw new UnauthorizedException();
    }
    return true;
  }
}

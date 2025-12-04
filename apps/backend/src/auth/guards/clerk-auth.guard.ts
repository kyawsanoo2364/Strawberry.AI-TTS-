import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private readonly logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['authorization']?.split(' ')[1] || null;

    try {
      const payload = await clerkClient.verifyToken(token);
      const user = await this.authService.findUserOrCreate(payload.sub);
      req.user = user;
    } catch (err) {
      this.logger.log(err);
      return false;
    }

    return true;
  }
}

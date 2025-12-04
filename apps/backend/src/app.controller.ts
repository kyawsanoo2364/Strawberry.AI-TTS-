import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClerkAuthGuard } from './auth/guards/clerk-auth.guard';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { RoleGuard } from './auth/guards/role.guard';
import { Role, ROLES } from './auth/decorators/role.decorator';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'Hello! Strawberry';
  }

  @UseGuards(ClerkAuthGuard, RoleGuard)
  @ROLES(Role.ADMIN)
  @Get()
  async cats(@Req() req: any, @Res() res: any) {
    const userId = req.user.id;
    return this.appService.getUser(userId, res);
  }
}

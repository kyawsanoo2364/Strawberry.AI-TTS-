import { clerkClient } from '@clerk/clerk-sdk-node';
import { Injectable } from '@nestjs/common';
import { User } from 'src/generated/prisma/client';
import { Prisma } from 'src/prisma/prisma';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: Prisma) {}

  async findUserOrCreate(clerkUserId: string) {
    const user = await clerkClient.users.getUser(clerkUserId);

    const _user = await this.prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (!_user) {
      const newUser = await this.prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });

      return newUser;
    }
    return _user;
  }
}

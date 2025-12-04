import { clerkClient } from '@clerk/clerk-sdk-node';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  async getUser(userId: string, res: Response) {
    return res.json({ userId });
  }

  health() {
    return 'Good';
  }
}

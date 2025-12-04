import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export const ROLES = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

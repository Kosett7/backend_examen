import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByUsername(username);
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
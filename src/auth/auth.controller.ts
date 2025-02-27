import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginData: { username: string; password: string },
  ): Promise<any> {
    const user = await this.authService.validateUser(
      loginData.username,
      loginData.password,
    );
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
}
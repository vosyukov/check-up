import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body()
    dto: LoginDto
  ): Promise<string> {
    return this.authService.login(dto.email, dto.password);
  }

  @ApiOperation({
    summary: 'Return JWT',
  })
  @ApiOkResponse({
    status: 200,
    type: 'string',
  })
  @Post('register')
  async register(
    @Body()
    dto: RegisterDto
  ): Promise<string> {
    const { email, password } = dto;
    return this.authService.register(email, password);
  }
}

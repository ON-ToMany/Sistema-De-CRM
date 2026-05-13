import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';
import { LocalAuthGuard } from '../guards/local.auth.guard';

@ApiTags('Usuario')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: UsuarioLogin) {
    return this.authService.login(user);
  }
}

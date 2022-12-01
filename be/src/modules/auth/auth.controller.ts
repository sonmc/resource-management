
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Body() loginDto: LoginDto): Promise<any> {
		return this.authService.generateToken(loginDto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get('user')
	async user(@Request() req): Promise<any> {
		return req.user;
	}
}

import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './strategies/local.auth.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.auth.strategy';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.EXPIRES_JWT }
  })],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, LocalStrategy]
})
export class AuthenticationModule {}

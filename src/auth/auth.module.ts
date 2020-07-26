import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./strategies/local.strategy";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { TokenService } from './token.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION_TIME'),
          }
        };
      }
    })
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    TokenService,
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule {}

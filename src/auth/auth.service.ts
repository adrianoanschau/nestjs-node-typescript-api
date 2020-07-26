import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { User } from "../users/models/user.model";
import { ConfigService } from "@nestjs/config";
import { TokenService } from "./token.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthService {

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User, refreshToken?: string) {
    if (refreshToken) {
      const valid = await this.tokenService.validateRefreshToken(user, refreshToken);
      if (!valid) {
        throw new UnauthorizedException();
      }
    }
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };
    const { token: access_token, expiresIn } = await this.tokenService.accessToken(payload);
    const { token: refresh_token } = await this.tokenService.refreshToken(payload, user);
    return {
      access_token, refresh_token,
      expires_in: expiresIn,
    }
  }

  revokeToken(user: User, refreshToken?: string) {
    return this.tokenService.revokeToken(user, refreshToken);
  }

}

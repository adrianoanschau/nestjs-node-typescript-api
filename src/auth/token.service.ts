import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../users/models/user.model";
import { PrismaService } from "../prisma/prisma.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async accessToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    const decoded = this.jwtService.decode(token);
    const expiresIn = decoded['exp'];
    return { token, expiresIn };
  }

  async refreshToken(payload: JwtPayload, user: User) {
    await this.cleanUpOldRefreshTokens(user);
    const token = this.jwtService.sign(payload,
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION_TIME'),
      },
    );
    await this.prismaService.refreshToken.create({
      data: { token, user: { connect: { id: user.id } } },
    });
    return { token };
  }

  async validateRefreshToken(user: User, refreshToken: string) {
    return (await this.prismaService.refreshToken.findMany({
      where: { token: refreshToken, userId: user.id },
    })).length > 0;
  }

  async revokeToken(user: User, refreshToken?: string) {
    const token = await this.prismaService.refreshToken.findMany({
      where: { token: refreshToken, userId: user.id },
    });
    return token.every(async (tk) => {
      try {
        await this.prismaService.refreshToken.delete({
          where: { id: tk.id },
        })
        return true;
      } catch {
        return false;
      }
    });
  }

  private async cleanUpOldRefreshTokens(user: User) {
    const tokens = await this.prismaService.refreshToken.findMany({
      where: { userId: user.id },
    });
    tokens.map(async (tk) => {
      const token = this.jwtService.decode(tk.token);
      const expire = token['exp'];
      if (expire < Math.round(new Date().getTime() / 1000)) {
        await this.prismaService.refreshToken.delete({
          where: { id: tk.id }
        });
      }
    });
  }
}

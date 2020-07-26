import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { User } from "../users/models/user.model";
import { CurrentUser } from "./decorators/current-user.decorator";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";

@Resolver('Auth')
export class AuthResolver {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Query(returns => User)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User) {
    return this.usersService.findById(user.id);
  }

  @Mutation()
  async login(@Args('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    return this.authService.login(user);
  }

  @Mutation()
  @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @CurrentUser() refreshUser: User
  ) {
    const user = await this.usersService.findById(refreshUser.id);
    return this.authService.login(user);
  }

}

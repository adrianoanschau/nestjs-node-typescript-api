import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserInput } from "./inputs/create-user.input";

@Injectable()
export class UsersService {

  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  findById(id: string) {
    return this.prismaService.user.findOne({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findOne({
      where: { email },
    });
  }

  createUser(input: CreateUserInput) {
    return this.prismaService.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: input.password,
      },
    });
  }

}

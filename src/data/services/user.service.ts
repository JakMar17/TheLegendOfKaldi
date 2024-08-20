import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";
import { DataPrismaService } from "./data-prisma.service";

@Injectable()
export class UserService extends DataPrismaService<User> {
  async users() {
    return this.prismaService.user.findMany();
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async addUsers(data: Prisma.UserCreateInput[]): Promise<void> {
    await this.prismaService.user.createMany({
      data
    });
  }
}
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";
import { DataPrismaService } from "./data-prisma.service";

@Injectable()
export class UserService extends DataPrismaService<User> {
  /**
   * Retrieves a list of users.
   *
   * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
   */
  async users() {
    return this.prismaService.user.findMany();
  }

  /**
   * Retrieves a user based on the provided unique input.
   *
   * @param userWhereUniqueInput - The unique input to identify the user.
   * @returns A promise that resolves to the found user or null if not found.
   */
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /**
   * Adds users to the database.
   * 
   * @param data - An array of user data to be added.
   * @returns A promise that resolves when the users are added successfully.
   */
  async addUsers(data: Prisma.UserCreateInput[]): Promise<void> {
    await this.prismaService.user.createMany({
      data
    });
  }
}
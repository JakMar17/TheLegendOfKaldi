import { Injectable } from "@nestjs/common";
import { Prisma, Operator } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";
import { DataPrismaService } from "./data-prisma.service";

@Injectable()
export class OperatorService extends DataPrismaService<Operator> {

  /**
   * Retrieves a list of operators.
   *
   * @returns {Promise<Operator[]>} A promise that resolves to an array of operators.
   */
  async operators() {
    return this.prismaService.operator.findMany();
  }

  /**
   * Retrieves an operator based on the provided unique identifier.
   *
   * @param where - The unique identifier of the operator.
   * @returns A promise that resolves to the retrieved operator, or null if not found.
   */
  async operator(
    where: Prisma.OperatorWhereUniqueInput,
  ): Promise<Operator | null> {
    return this.prismaService.operator.findUnique({
      where
    });
  }

  /**
   * Adds operators to the database.
   * 
   * @param data - An array of operator data to be added.
   * @returns A promise that resolves when the operators are added successfully.
   */
  async addOperators(data: Prisma.OperatorCreateInput[]): Promise<void> {
    await this.prismaService.operator.createMany({
      data
    });
  }
}
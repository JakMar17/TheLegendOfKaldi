import { Injectable } from "@nestjs/common";
import { Prisma, Operator } from "@prisma/client";
import { PrismaService } from "src/services/prisma.service";
import { DataPrismaService } from "./data-prisma.service";

@Injectable()
export class OperatorService extends DataPrismaService<Operator> {

  async operators() {
    return this.prismaService.operator.findMany();
  }

  async operator(
    where: Prisma.OperatorWhereUniqueInput,
  ): Promise<Operator | null> {
    return this.prismaService.operator.findUnique({
      where
    });
  }

  async addOperators(data: Prisma.OperatorCreateInput[]): Promise<void> {
    await this.prismaService.operator.createMany({
      data
    });
  }
}
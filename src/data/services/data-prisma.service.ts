import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";

@Injectable()
export class DataPrismaService<T> {
    constructor (protected readonly prismaService: PrismaService) {}

}
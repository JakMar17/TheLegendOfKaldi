import { Injectable } from "@nestjs/common";
import { DataPrismaService } from "./data-prisma.service";
import { Prisma, SystemService } from "@prisma/client";

@Injectable()
export class SystemServiceService extends DataPrismaService<SystemService> {

    async systemServices() {
        return this.prismaService.systemService.findMany();
    }

    async addSystemServices(data: Prisma.SystemServiceCreateInput[]): Promise<void> {
        await this.prismaService.systemService.createMany({
            data
        });
    }
}
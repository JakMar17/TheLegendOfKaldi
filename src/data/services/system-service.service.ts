import { Injectable } from "@nestjs/common";
import { DataPrismaService } from "./data-prisma.service";
import { Prisma, SystemService } from "@prisma/client";

@Injectable()
export class SystemServiceService extends DataPrismaService<SystemService> {

    /**
     * Retrieves the system services.
     *
     * @returns A promise that resolves to an array of system services.
     */
    async systemServices() {
        return this.prismaService.systemService.findMany();
    }

    /**
     * Adds system services to the database.
     * 
     * @param data - An array of system service objects to be created.
     * @returns A promise that resolves to void.
     */
    async addSystemServices(data: Prisma.SystemServiceCreateInput[]): Promise<void> {
        await this.prismaService.systemService.createMany({
            data
        });
    }
}
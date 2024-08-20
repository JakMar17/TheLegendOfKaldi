import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { SystemServiceService } from "src/data/services/system-service.service";
import { AuthInterceptor } from "src/interceptros/auth.interceptor";

@Controller("system-services")
@UseInterceptors(AuthInterceptor)
export class SystemServiceController {

    constructor(
        private readonly systemServiceService: SystemServiceService
    ) {}

    @Get()
    async getSystemServices() {
        return this.systemServiceService.systemServices();
    }
}
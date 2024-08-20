import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ApiBasicAuth, ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SystemServiceService } from "src/data/services/system-service.service";
import { AuthInterceptor } from "src/interceptros/auth.interceptor";

@Controller("system-services")
@UseInterceptors(AuthInterceptor)
@ApiBasicAuth()
@ApiTags("System services")
@ApiHeader({name: "role", required: true, enum: ['user', 'operator']})
export class SystemServiceController {

    constructor(
        private readonly systemServiceService: SystemServiceService
    ) {}

    @Get()
    @ApiOperation({summary: "Get all system services"})
    async getSystemServices() {
        return this.systemServiceService.systemServices();
    }
}
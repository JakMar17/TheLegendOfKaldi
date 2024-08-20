import { Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Put, Query, UseInterceptors } from "@nestjs/common";
import { ApiBasicAuth, ApiHeader, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ConversationService } from "src/data/services/conversation.service";
import { AuthInterceptor } from "src/interceptros/auth.interceptor";
import { OperatorOnlyInterceptor } from "src/interceptros/operator-only.interceptor";
import { ParseBoolOrUndefinedPipe } from "src/pipes/parse-bool-undefined.pipe";
import { UserRequestService } from "src/services/user-request.service";

@Controller('operator')
@UseInterceptors(AuthInterceptor, OperatorOnlyInterceptor)
@ApiBasicAuth()
@ApiTags("Operator administration")
@ApiHeader({name: "role", required: true, enum: ['operator']})
export class OperatorController {
    constructor(
        private readonly conversationService: ConversationService,
        private readonly userRequestService: UserRequestService
    ) {}

    @Get("/conversations")
    @ApiOperation({summary: "Get all conversations"})
    @ApiQuery({name: 'assigned', required: false, type: Boolean, description: "Filter by assigned status, list all if undefined"})
    async getConversations(@Query('assigned', ParseBoolOrUndefinedPipe) assigned?: boolean) {
        return this.conversationService.getConversations(assigned);
    }

    @Put("/conversations/:id/assign")
    @ApiOperation({summary: "Assign conversation to operator"})
    async assignConversation(@Param('id', ParseIntPipe) conversationId: number) {
        return this.conversationService.assigneConversationToOperator(conversationId, this.userRequestService.loggedInUser.id);
    }
}
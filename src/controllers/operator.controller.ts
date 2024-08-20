import { Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Put, Query, UseInterceptors } from "@nestjs/common";
import { ConversationService } from "src/data/services/conversation.service";
import { AuthInterceptor } from "src/interceptros/auth.interceptor";
import { OperatorOnlyInterceptor } from "src/interceptros/operator-only.interceptor";
import { ParseBoolOrUndefinedPipe } from "src/pipes/parse-bool-undefined.pipe";
import { UserRequestService } from "src/services/user-request.service";

@Controller('operator')
@UseInterceptors(AuthInterceptor, OperatorOnlyInterceptor)
export class OperatorController {
    constructor(
        private readonly conversationService: ConversationService,
        private readonly userRequestService: UserRequestService
    ) {}

    @Get("/conversations")
    async getConversations(@Query('assigned', ParseBoolOrUndefinedPipe) assigned?: boolean) {
        return this.conversationService.getConversations(assigned);
    }

    @Put("/conversations/:id/assign")
    async assignConversation(@Param('id', ParseIntPipe) conversationId: number) {
        return this.conversationService.assigneConversationToOperator(conversationId, this.userRequestService.loggedInUser.id);
    }
}
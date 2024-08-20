import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, Req, UseInterceptors } from "@nestjs/common";
import { Conversation, Operator, User } from "@prisma/client";
import { ConversationService } from "src/data/services/conversation.service";
import { MessageService } from "src/data/services/message.service";
import { AuthInterceptor } from "src/interceptros/auth.interceptor";
import { UserRequestService } from "src/services/user-request.service";

@Controller('conversations')
@UseInterceptors(AuthInterceptor)
export class ConversationController {
    constructor(
        private readonly userRequestService: UserRequestService, 
        private readonly conversationService: ConversationService,
        private readonly messageService: MessageService
    ) {}

    @Get()
    async getConversations() {
        return this.conversationService.getUsersConversations(this.userRequestService.loggedInUser.id);
    }

    @Get(':id')
    async getConversation(@Param('id', ParseIntPipe) id: number) {
        return this.conversationService.getConversation(id);
    }
    
    @Post()
    async createConversation(@Body() conversation: Conversation) {
        const user = this.userRequestService.loggedInUser;
        return this.conversationService.createConversation(conversation, user);
    }

    @Put(':id/message')
    async addMessageToConversation(@Param('id', ParseIntPipe) id, @Body() {content}: {content: string}) {
        const author: {operator?: Operator, user?: User} = {};
        const userRole = this.userRequestService.role;
        const loggedInUser = this.userRequestService.loggedInUser;

        if(userRole === 'user') {
            author.user = loggedInUser;
        } else if (userRole === 'operator') {
            author.operator = loggedInUser;
        }

        return this.messageService.createMessage(content, id, author);
    }
}
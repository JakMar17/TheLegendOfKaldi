import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { DataPrismaService } from "./data-prisma.service";
import { Message, Operator, User } from "@prisma/client";

@Injectable()
export class MessageService extends DataPrismaService<Message> {

    
    /**
     * Retrieves the messages of a conversation.
     * 
     * @param conversationId - The ID of the conversation.
     * @returns A promise that resolves to an array of messages, including the associated operator and user.
     */
    async getConversationMessages(conversationId: number) {
        return this.prismaService.message.findMany({
            where: {
                conversationId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                operator: true,
                user: true
            }
        });
    }


    /**
     * Creates a new message and associates it with a conversation.
     * 
     * @param message - The message to be created.
     * @param conversationId - The ID of the conversation to associate the message with.
     * @param options - Additional options for creating the message.
     * @param options.operator - The operator associated with the message (optional).
     * @param options.user - The user associated with the message (optional).
     * @returns A promise that resolves to the created message.
     */
    async createMessage(content: string, conversationId: number, { operator, user }: { operator?: Operator, user?: User }) {
        const data: any = {
            content,
            conversation: {
                connect: {
                    id: conversationId
                }
            }
        };

        if (operator) {
            data.operator = {
                connect: {
                    id: operator.id
                }
            }
        }

        if (user) {
            data.user = {
                connect: {
                    id: user.id
                }
            }
        }

        return this.prismaService.message.create({ data });
    }

}
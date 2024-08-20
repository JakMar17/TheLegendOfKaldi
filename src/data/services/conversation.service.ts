import { Injectable } from "@nestjs/common";
import { Conversation, User } from "@prisma/client";
import { create } from "domain";
import { connect } from "http2";
import { PrismaService } from "src/services/prisma.service";
import { DataPrismaService } from "./data-prisma.service";

@Injectable()
export class ConversationService extends DataPrismaService<ConversationService> {


    /**
     * Retrieves conversations for a specific user.
     * 
     * @param userId - The ID of the user.
     * @returns A promise that resolves to an array of conversations.
     */
    async getUsersConversations(userId: number) {
        return this.prismaService.conversation.findMany({
            include: {
                operator: true,
                user: true,
                systemService: true
            },
            where: { user: { is: { id: userId } } }
        });
    }

    /**
     * Retrieves conversations based on the assigned parameter. Used for operators.
     * If assigned is true, retrieves conversations with assigned operators.
     * If assigned is false, retrieves conversations without assigned operators.
     * If assigned is not provided, retrieves all conversations.
     * 
     * @param assigned - Optional parameter to filter conversations based on assignment status.
     * @returns A promise that resolves to an array of conversations.
     */
    async getConversations(assigned?: boolean) {
        const where: any = {};

        if(assigned === true) {
            where.operator = {
                isNot: null
            };
        } else if (assigned === false) {
            where.operator = {
                is: null
            };
        }

        return this.prismaService.conversation.findMany({
            include: {
                operator: true,
                user: true,
                systemService: true
            },
            where
        });

    }

    /**
     * Assigns a conversation to an operator.
     * 
     * @param conversationId - The ID of the conversation to be assigned.
     * @param operatorId - The ID of the operator to assign the conversation to.
     * @returns A promise that resolves to the updated conversation object.
     */
    async assigneConversationToOperator(conversationId: number, operatorId: number) {

        const conversation = await this.prismaService.conversation.findUnique({
            where: {
                id: conversationId
            }
        });

        if(conversation.operatorId !== null) {
            throw new Error('Conversation already assigned');
        }

        return this.prismaService.conversation.update({
            include: {
                operator: true,
                user: true,
                systemService: true
            },
            where: {
                id: conversationId
            },
            data: {
                operator: {
                    connect: {
                        id: operatorId
                    }
                }
            }
        });
    }

    /**
     * Retrieves a conversation by its ID.
     *
     * @param conversationId - The ID of the conversation to retrieve.
     * @returns A Promise that resolves to the conversation object, including related entities such as operator, user, system service, and messages.
     */
    async getConversation(conversationId: number) {
        return this.prismaService.conversation.findUnique({
            include: {
                operator: true,
                user: true,
                systemService: true,
                messages: {
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        operator: true,
                        user: true
                    }
                }
            },
            where: {
                id: conversationId
            }
        });
    }

    /**
     * Creates a conversation.
     * 
     * @param conversation - The conversation object.
     * @param user - The user object.
     * @returns A promise that resolves to the created conversation.
     */
    async createConversation(conversation: Conversation, user: User) {
        return this.prismaService.conversation.create({
            include: {
                operator: true,
                user: true,
                systemService: true
            },
            data: {
                ...conversation,
                systemService: {
                    connect: {
                        id: (conversation as any).systemService.id
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                }
            } as any
        });
    }

}
import { Injectable } from "@nestjs/common";
import { Conversation, User } from "@prisma/client";
import { create } from "domain";
import { connect } from "http2";
import { PrismaService } from "src/services/prisma.service";
import { DataPrismaService } from "./data-prisma.service";

@Injectable()
export class ConversationService extends DataPrismaService<ConversationService> {


    /**
     * Retrieves conversations for a given user.
     * 
     * @param userId - The ID of the user.
     * @returns A promise that resolves to an array of conversations.
     */
    async getUsersConversations(userId?: number) {
        return this.prismaService.conversation.findMany({
            include: {
                operator: true,
                user: true,
                systemService: true
            },
            where: { user: { is: { id: userId } } }
        });
    }

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

    async getOperatorConversations(operatorId?: number, assigned?: boolean) {
        return this.prismaService.conversation.findMany({
            include: {
                operator: true,
                user: true,
                systemService: true
            },
            where: operatorId ? { operator: { is: { id: operatorId } } } : {}
        })
    }

    async getNotAssignedConversations() {
        return this.prismaService.conversation.findMany({
            include: {
                operator: true,
                user: true,
                systemService: true
            },
            where: {
                operator: {
                    is: null
                }
            }
        });
    }

    async assigneConversationToOperator(conversationId: number, operatorId: number) {
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
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/services/prisma.service";
import { DataPrismaService } from "./data-prisma.service";
import { Message, Operator, User } from "@prisma/client";

@Injectable()
export class MessageService extends DataPrismaService<Message> {

    /**
     * Creates a new message.
     * 
     * @param content - The content of the message.
     * @param conversationId - The ID of the conversation.
     * @param operator - The operator associated with the message (optional).
     * @param user - The user associated with the message (optional).
     * @returns A promise that resolves to the created message.
     */
    async createMessage(content: string, conversationId: number, { operator, user }: { operator?: Operator, user?: User }) {
        const connectEntity = (id: number) => ({ connect: { id } });

        const data: any = {
            content,
            conversation: {
                connect: {
                    id: conversationId
                }
            }
        };

        if (operator) {
            data.operator = connectEntity(operator.id);
        }

        if (user) {
            data.user = connectEntity(user.id);
        }

        return this.prismaService.message.create({ data });
    }

}
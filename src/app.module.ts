import { Module, OnModuleInit, ParseBoolPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './data/services/user.service';
import { PrismaService } from './services/prisma.service';
import { OperatorService } from './data/services/operator.service';
import { AuthInterceptor } from './interceptros/auth.interceptor';
import { UserRequestService } from './services/user-request.service';
import { OperatorOnlyInterceptor } from './interceptros/operator-only.interceptor';
import { ConversationController } from './controllers/converstation.controller';
import { ConversationService } from './data/services/conversation.service';
import { MessageService } from './data/services/message.service';
import { UserOnlyInterceptor } from './interceptros/user-only.interface';
import { SystemService } from '@prisma/client';
import { SystemServiceService } from './data/services/system-service.service';
import { DataPrismaService } from './data/services/data-prisma.service';
import { OperatorController } from './controllers/operator.controller';
import { SystemServiceController } from './controllers/system-service.controller';
import { ParseBoolOrUndefinedPipe } from './pipes/parse-bool-undefined.pipe';

const controllers = [
  ConversationController,
  OperatorController,
  SystemServiceController
];

const dataServices = [
  ConversationService,
  MessageService,
  UserService,
  PrismaService,
  OperatorService,
  SystemServiceService,
  DataPrismaService
];

const interceptors = [
  AuthInterceptor,
  OperatorOnlyInterceptor,
  UserOnlyInterceptor
];

const pipes = [
  ParseBoolPipe,
  ParseBoolOrUndefinedPipe
];


@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [...controllers],
  providers: [
    UserRequestService,
    ...dataServices,
    ...pipes,
    ...interceptors,
  ],
})
export class AppModule implements OnModuleInit {

  constructor(
    private readonly userService: UserService,
    private readonly operatorService: OperatorService,
    private readonly systemServiceService: SystemServiceService
  ) { }

  onModuleInit() {
    this.userService.users().then(users => {
      if (users.length === 0) {
        this.userService.addUsers([
          {
            username: 'pinkop',
            password: 'password',
            name: 'Pinko Palinko'
          },
          {
            username: 'user',
            password: 'password',
            name: 'User'
          }
        ])
      }
    });

    this.operatorService.operators().then(operators => {
      if (operators.length === 0) {
        this.operatorService.addOperators([
          {
            username: 'operator1',
            password: 'password',
            name: 'Operator 1'
          },
          {
            username: 'operator2',
            password: 'password',
            name: 'Operator 2'
          }
        ])
      }
    });

    this.systemServiceService.systemServices().then(systemServices => {
      if (systemServices.length === 0) {
        this.systemServiceService.addSystemServices([
          {
            name: 'Service 1'
          },
          {
            name: 'Service 2',
          }
        ])
      }
    });
  }
}
import { Injectable, Scope } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UserService } from "src/data/services/user.service";
import { Operator, User } from "@prisma/client";
import { OperatorService } from "src/data/services/operator.service";

@Injectable({scope: Scope.REQUEST})
export class UserRequestService {
  private _logedInUser?: User | Operator;
  private _role: string;

    constructor(private userService: UserService, private operatorService: OperatorService) {}


  async setUser({username, password, role}: {username: string, password: string, role: string}) {
    console.log(username, password, role);
    switch(role) {
        case 'user':
            const userModel = await this.userService.user({username, password});
            console.log(userModel);
            if(!userModel) {
                throw new Error('User not found');
            } else {
                this._logedInUser = userModel;
            }
            break;
        case 'operator':
            const operatorModel = await this.operatorService.operator({username, password});
            if(!operatorModel) {
                throw new Error('Operator not found');
            } else {
                this._logedInUser = operatorModel;
            }
            break;
    }
    this._role = role;
  }

  get loggedInUser(): User | Operator | undefined {
    return this._logedInUser;
  }

  get role(): string {
      return this._role;
  }
}
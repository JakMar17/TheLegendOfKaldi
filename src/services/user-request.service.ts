import { Injectable, Scope } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UserService } from "src/data/services/user.service";
import { Operator, User } from "@prisma/client";
import { OperatorService } from "src/data/services/operator.service";

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
  private _logedInUser?: User | Operator;
  private _role: string;

  constructor(private userService: UserService, private operatorService: OperatorService) { }


  /**
   * Sets the user based on the provided username, password, and role.
   * 
   * @param {Object} user - The user object containing the username, password, and role.
   * @param {string} user.username - The username of the user.
   * @param {string} user.password - The password of the user.
   * @param {string} user.role - The role of the user.
   * @throws {Error} If the user or operator is not found.
   */
  async setUser({ username, password, role }: { username: string, password: string, role: string }) {
    switch (role) {
      case 'user':
        const userModel = await this.userService.user({ username, password });
        console.log(userModel);
        if (!userModel) {
          throw new Error('User not found');
        } else {
          this._logedInUser = userModel;
        }
        break;
      case 'operator':
        const operatorModel = await this.operatorService.operator({ username, password });
        if (!operatorModel) {
          throw new Error('Operator not found');
        } else {
          this._logedInUser = operatorModel;
        }
        break;
    }
    this._role = role;
  }

  /**
   * Gets the logged in user.
   * @returns The logged in user, which can be of type User, Operator, or undefined.
   */
  get loggedInUser(): User | Operator | undefined {
    return this._logedInUser;
  }

  /**
   * Gets the role of the user.
   *
   * @returns The role of the user as a string.
   */
  get role(): string {
    return this._role;
  }
}
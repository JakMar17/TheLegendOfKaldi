import { OperatorService } from "src/data/services/operator.service";
import { SystemServiceService } from "src/data/services/system-service.service";
import { UserService } from "src/data/services/user.service";

/**
 * Initializes the application data.
 * 
 * @param {Object} options - The options object.
 * @param {UserService} options.userService - The user service.
 * @param {OperatorService} options.operatorService - The operator service.
 * @param {SystemServiceService} options.systemServiceService - The system service service.
 */
export function initAppData({
    userService,
    operatorService,
    systemServiceService
}: {
    userService: UserService;
    operatorService: OperatorService;
    systemServiceService: SystemServiceService;
}) {
    userService.users().then(users => {
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
  
      operatorService.operators().then(operators => {
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
  
      systemServiceService.systemServices().then(systemServices => {
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
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, of, throwError } from "rxjs";
import { UserRequestService } from "src/services/user-request.service";

@Injectable()
export class UserOnlyInterceptor implements NestInterceptor {
    /**
     * Intercepts the incoming request and checks if the user has the 'user' role.
     * If the user does not have the 'user' role, returns an 'Unauthorized' response.
     * Otherwise, allows the request to proceed to the next handler.
     *
     * @param context - The execution context of the request.
     * @param next - The next handler in the request pipeline.
     * @returns An Observable or Promise that represents the result of the interception.
     */
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const role = req.headers['role'];

        if (role !== 'user') {
            return of('Unauthorized');
        }

        return next.handle();
    }
}
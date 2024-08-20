import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, of, throwError } from "rxjs";
import { UserRequestService } from "src/services/user-request.service";

@Injectable()
export class OperatorOnlyInterceptor implements NestInterceptor {
    /**
     * Intercepts the incoming request and checks if the role in the request headers is 'operator'.
     * If the role is not 'operator', returns an Observable with the value 'Unauthorized'.
     * Otherwise, passes the request to the next handler.
     *
     * @param context - The execution context of the request.
     * @param next - The next handler in the chain.
     * @returns An Observable or Promise of an Observable.
     */
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const role = req.headers['role'];

        if (role !== 'operator') {
            return of('Unauthorized');
        }

        return next.handle();
    }
}
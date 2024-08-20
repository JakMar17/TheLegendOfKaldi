import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { error } from "console";
import { catchError, from, mergeMap, Observable, of, tap } from "rxjs";
import { UserRequestService } from "src/services/user-request.service";

@Injectable()
export class AuthInterceptor implements NestInterceptor {

    constructor(private userRequestService: UserRequestService) {}


    /**
     * Intercepts incoming requests and performs authentication and authorization checks.
     * 
     * @param context - The execution context of the request.
     * @param next - The next call handler in the chain.
     * @returns An observable or promise of an observable that represents the result of the interception.
     */
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const authBase64 = req.headers['authorization'].split(' ')[1];
        const decodedAuth = Buffer.from(authBase64, 'base64').toString('utf-8');
        const [username, password] = decodedAuth.split(':');
        const role = req.headers['role'];

        if(username == null || password == null || role == null) {
            return of('Unauthorized');
        }

        return from(this.userRequestService.setUser({username, password, role})).pipe(
            
            mergeMap(() => next.handle()),
        )
    }
}
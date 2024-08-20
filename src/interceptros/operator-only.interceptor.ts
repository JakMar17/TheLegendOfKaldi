import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, of, throwError } from "rxjs";
import { UserRequestService } from "src/services/user-request.service";

@Injectable()
export class OperatorOnlyInterceptor implements NestInterceptor {
intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const role = req.headers['role'];

        if(role !== 'operator') {
            return of('Unauthorized');
        }

        return next.handle();
    }
}
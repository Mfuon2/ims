import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { log } from '../main';

export interface Response<T> {
  data: T;
  error: string;
  message: string;
  statusCode: number;
  status: boolean;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    return next.handle().pipe(
      map((data) => {
        const response: Response<T> = {
          statusCode: HttpStatus.OK,
          status: data.success,
          message: data.message,
          error: '',
          data: data.data,
        };
        switch (response.statusCode) {
          case HttpStatus.OK:
            response.message = data.message;
            break;
          case HttpStatus.NOT_FOUND:
            response.error = 'Not Found';
            response.message = 'The requested resource was not found.';
            break;
          case HttpStatus.INTERNAL_SERVER_ERROR:
            response.error = 'Internal Server Error';
            response.message = 'An internal server error occurred.';
            break;
          case HttpStatus.BAD_GATEWAY:
            response.error = 'Bad Gateway';
            response.message =
              'The server received an invalid response from an upstream server.';
            break;
          case HttpStatus.FORBIDDEN:
            response.error = 'Forbidden';
            response.message = 'Access to the requested resource is forbidden.';
            break;
          case HttpStatus.UNAUTHORIZED:
            response.error = 'Unauthorized';
            response.message =
              'Authentication is required to access the requested resource.';
            break;
          default:
            response.message = 'Request processed.';
            break;
        }
        return response;
      }),
    );
  }
}

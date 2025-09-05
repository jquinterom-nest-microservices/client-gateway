import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

function isRpcError(
  error: unknown,
): error is { status: number; message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  );
}

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError() as string;

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({
        status: 500,
        message: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    if (isRpcError(rpcError)) {
      const status = isNaN(+rpcError.status) ? 400 : Number(rpcError.status);
      return response.status(status).json(rpcError);
    }

    return response.status(400).json({
      status: 400,
      message:
        typeof rpcError === 'string' ? rpcError : JSON.stringify(rpcError),
    });
  }
}

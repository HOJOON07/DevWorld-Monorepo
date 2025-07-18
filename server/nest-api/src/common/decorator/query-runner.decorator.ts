import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const QueryRunner = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (!request.queryRunner) {
    throw new InternalServerErrorException(
      'Query Runner 데코레이터를 사용하려면 Transaction intercepotr를 사용해야 합니다.',
    );
  }

  return request.queryRunner;
});

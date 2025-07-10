[Nest] 88546  - 07/10/2025, 7:42:36 PM   ERROR [ExceptionsHandler] this.removeListener is not a function
TypeError: this.removeListener is not a function
    at Object.socketOnError [as error] (node:_http_server:883:8)
    at TransformOperationExecutor.transform (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/class-transformer@0.5.1/node_modules/src/TransformOperationExecutor.ts:207:39)
    at TransformOperationExecutor.transform (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/class-transformer@0.5.1/node_modules/src/TransformOperationExecutor.ts:327:31)
    at TransformOperationExecutor.transform (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/class-transformer@0.5.1/node_modules/src/TransformOperationExecutor.ts:327:31)
    at TransformOperationExecutor.transform (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/class-transformer@0.5.1/node_modules/src/TransformOperationExecutor.ts:327:31)
    at TransformOperationExecutor.transform (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/class-transformer@0.5.1/node_modules/src/TransformOperationExecutor.ts:327:31)
    at ClassTransformer.instanceToPlain (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/class-transformer@0.5.1/node_modules/src/ClassTransformer.ts:25:21)
    at Object.classToPlain (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/class-transformer@0.5.1/node_modules/src/index.ts:23:27)
    at ClassSerializerInterceptor.transformToPlain (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/@nestjs+common@10.4.19_class-transformer@0.5.1_class-validator@0.14.2_reflect-metadata@0.2.2_rxjs@7.8.2/node_modules/@nestjs/common/serializer/class-serializer.interceptor.js:56:37)
    at ClassSerializerInterceptor.serialize (/Users/gimhojun/Desktop/mfa/node_modules/.pnpm/@nestjs+common@10.4.19_class-transformer@0.5.1_class-validator@0.14.2_reflect-metadata@0.2.2_rxjs@7.8.2/node_modules/@nestjs/common/serializer/class-serializer.interceptor.js:49:20)
    at /Users/gimhojun/Desktop/mfa/node_modules/.pnpm/@nestjs+common@10.4.19_class-transformer@0.5.1_class-validator@0.14.2_reflect-metadata@0.2.2_rxjs@7.8.2/node_modules/@nestjs/common/serializer/class-serializer.interceptor.js:38:54

node:internal/assert:11
throw new ERR_INTERNAL_ASSERTION(message);
      ^

Error [ERR_INTERNAL_ASSERTION]: This is caused by either a bug in Node.js or incorrect usage of Node.js internals.
Please open an issue with this stack trace at https://github.com/nodejs/node/issues

code: 'ERR_INTERNAL_ASSERTION'

Node.js v22.13.0

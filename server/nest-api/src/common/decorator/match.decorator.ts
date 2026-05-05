import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'match',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          return value === (args.object as Record<string, unknown>)[relatedProperty];
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          return `${args.property}는 ${relatedProperty}와 일치해야 합니다.`;
        },
      },
    });
  };
}

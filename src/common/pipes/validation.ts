import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationPipe implements PipeTransform<any> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async transform(value: any, metadata: ArgumentMetadata): Promise<number> {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private toValidate(metatype: Type<any>): boolean {
    const types = [String, Boolean, Number, Array, Object];

    return !types.find(type => metatype === type);
  }
}

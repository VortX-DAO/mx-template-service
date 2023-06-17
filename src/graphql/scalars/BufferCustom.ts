/* eslint-disable eol-last */
import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('BufferCustom', (type) => Buffer)
export class BufferCustomScalar implements CustomScalar<string, Buffer> {
  description = 'Address custom type';

  parseValue(value: unknown): Buffer {
    return Buffer.from(value as string, 'hex'); // value from the client
  }

  serialize(value: any): string {
    const buffer = Buffer.from(value);
    if (buffer.length > 0) {
      return '0x' + buffer.toString('hex');
    }
    return '';
  }

  parseLiteral(ast: any) {
    // AST parsing logic here. This function is used when you get the scalar value from the client in a query or mutation
    if (ast.kind === Kind.STRING) {
      return ast.value.toString(); // Return a string from the AST value
    }
    return null; // Invalid hard-coded value, return null
  }
}

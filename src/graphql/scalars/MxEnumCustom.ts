/* eslint-disable eol-last */
import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('MxEnum', (type) => Buffer)
export class MxEnumCustomScalar implements CustomScalar<string, string> {
  description = 'Mx Enum custom type';

  parseValue(value: unknown): string {
    return value as string; // value from the client
  }

  serialize(value: any): string {
    return value.name;
  }

  parseLiteral(ast: any) {
    // AST parsing logic here. This function is used when you get the scalar value from the client in a query or mutation
    if (ast.kind === Kind.STRING) {
      return ast.value.toString(); // Return a string from the AST value
    }
    return null; // Invalid hard-coded value, return null
  }
}

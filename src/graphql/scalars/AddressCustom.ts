import { Scalar, CustomScalar } from "@nestjs/graphql";
import { Kind } from "graphql";
import * as gqlModel from "../graphql";

@Scalar("AddressCustom", (type) => gqlModel.GQLAddress)
export class AddressCustomScalar
  implements CustomScalar<string, gqlModel.GQLAddress>
{
  description = "Address custom type";

  parseValue(value: unknown): gqlModel.GQLAddress {
    const returnValue = new gqlModel.GQLAddress();
    returnValue.bech32 = value as string;
    return returnValue; // value from the client
  }

  serialize(value: any): string {
    if (typeof value.bech32 !== "function") {
      return value.bech32;
    } else {
      return value.bech32();
    }
  }

  parseLiteral(ast: any) {
    // AST parsing logic here. This function is used when you get the scalar value from the client in a query or mutation
    if (ast.kind === Kind.STRING) {
      return ast.value.toString(); // Return a string from the AST value
    }
    return null; // Invalid hard-coded value, return null
  }
}

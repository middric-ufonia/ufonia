import fs from "fs";
import { parse } from "graphql";
import { codegen } from "@graphql-codegen/core";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { typeDefs } from "./typeDefs.js";

const typesDir = "./src/@types";
const schemaDir = "./src/schema";

if (!fs.existsSync(typesDir)) {
  fs.mkdirSync(typesDir);
}
if (!fs.existsSync(schemaDir)) {
  fs.mkdirSync(schemaDir);
}

fs.writeFileSync(`${schemaDir}/schema.graphql`, typeDefs);

codegen({
  documents: [],
  config: {
    useIndexSignature: true,
    disableDescriptions: true,
  },
  schema: parse(typeDefs),
  filename: `${typesDir}/graphQLSchema.ts`,
  plugins: [
    {
      typescript: {},
    },
    {
      "typescript-resolvers": {},
    },
  ],
  pluginMap: {
    typescript: typescriptPlugin,
    "typescript-resolvers": typescriptResolversPlugin,
  },
}).then((out) => {
  fs.writeFileSync(`${typesDir}/graphQLSchema.ts`, out);
});

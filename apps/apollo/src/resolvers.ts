import { GraphQLError } from "graphql";
import type { Resolvers } from "./@types/graphQLSchema.js";
import { UfoniaApolloServerContext } from "./index.js";

export const resolvers: Resolvers = {
  Query: {
    healthCheck: () => true,
  },
  Mutation: {
    sendMessage: async (
      _parent,
      args,
      { dataSources }: UfoniaApolloServerContext
    ) => {
      try {
        const call = await dataSources.twilio.createCall(
          args.input.msg,
          args.input.tel
        );

        return { sid: call.sid, code: "200", success: true };
      } catch (error) {
        throw new GraphQLError("Unable to connect to service provider", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
          },
          originalError: error,
        });
      }
    },
  },
};

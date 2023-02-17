import { ApolloServer, ApolloServerPlugin } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import twilio from "twilio";
import { TwilioDataSource } from "./dataSources/twilio.js";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";

if (
  !process.env.TWILIO_ACCOUNT_SID ||
  !process.env.TWILIO_AUTH_TOKEN ||
  !process.env.TWILIO_TEL_NO
) {
  throw new Error("Missing environment variables!");
}

export interface UfoniaApolloServerContext {
  dataSources: {
    twilio: TwilioDataSource;
  };
}

const loggingPlugin: ApolloServerPlugin = {
  async requestDidStart({ request, logger }) {
    const introspectionOp = "IntrospectionQuery";
    if (request.operationName !== introspectionOp) {
      let query = request.query;
      if (query) {
        query = query.replace(/\n/g, "").replace(/"[^"]+"/g, '""');
      }

      const variables = Object.keys(request.variables || {});
      logger.info({
        event: "request",
        operationName: request.operationName,
        query,
        variables,
      });
    }

    return {
      async didEncounterErrors({ logger, errors }) {
        const errorDetails = {
          error: Object.prototype.hasOwnProperty.call(errors, "message")
            ? (errors as any).message
            : JSON.stringify(errors),
          stack: Object.prototype.hasOwnProperty.call(errors, "stack")
            ? (errors as any).stack
            : null,
        };
        logger.error({ event: "errors", errors: errorDetails });
      },

      async willSendResponse({ logger, metrics, request }) {
        if (request.operationName !== introspectionOp) {
          logger.info({ event: "response", metrics });
        }
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [loggingPlugin],
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      dataSources: {
        twilio: new TwilioDataSource(
          twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN),
          {
            telNo: process.env.TWILIO_TEL_NO,
          }
        ),
      },
    };
  },
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

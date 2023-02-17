import { ApolloServer } from "@apollo/server";
import assert from "assert";
import { UfoniaApolloServerContext } from "..";
import { TwilioDataSource } from "../dataSources/twilio";
import { resolvers } from "../resolvers";
import { typeDefs } from "../typeDefs";

describe("Telephony", () => {
  let testServer: ApolloServer<UfoniaApolloServerContext>;

  beforeAll(() => {
    testServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it("returns a successful healthcheck", async () => {
    const response = await testServer.executeOperation({
      query: "query HealthCheck { healthCheck }",
    });
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body.singleResult.data?.healthCheck).toBeTruthy();
  });

  it("makes a phone call using the Twilio datasource", async () => {
    const twilio = new TwilioDataSource(null, {
      telNo: "",
    });
    twilio.createCall = jest.fn(async (message: string, recipient: string) => {
      return await { sid: "sid" };
    });

    const response = await testServer.executeOperation(
      {
        query: `#graphql
          mutation SendMessage($input: SendMessageInput) {
            sendMessage(input: $input) {
              sid
              code
              success
            }
          }`,
        variables: {
          input: {
            tel: "123",
            msg: "abc",
          },
        },
      },
      {
        contextValue: {
          dataSources: {
            twilio,
          },
        },
      }
    );
    assert(response.body.kind === "single");
    expect(response.body.singleResult.errors).toBeUndefined();
    expect(response.body).toMatchSnapshot();
  });
});

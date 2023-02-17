export const typeDefs = `#graphql
  type Message {
    tel: String!
    msg: String!
  }

  type SendMessageResponse {
    code: String!
    success: Boolean!
    sid: String
  }

  input SendMessageInput {
    tel: String!
    msg: String!
  }

  type Query {
    healthCheck: Boolean!
  }

  type Mutation {
    sendMessage(input: SendMessageInput): SendMessageResponse
  }
`;

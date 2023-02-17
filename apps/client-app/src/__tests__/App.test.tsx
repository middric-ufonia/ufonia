import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import App, { SEND_MESSAGE } from "../App";
import { GraphQLError } from "graphql";

describe("app", () => {
  it("renders successfully", async () => {
    render(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
    expect(await screen.findAllByLabelText("Telephone")).toHaveLength(1);
    expect(await screen.findAllByLabelText("Message")).toHaveLength(1);
  });

  it("submits successfully", async () => {
    const mocks = [
      {
        request: {
          query: SEND_MESSAGE,
          variables: {
            input: { msg: "This is a test message.", tel: "+447700900077" },
          },
        },
        result: {
          data: {
            sendMessage: null,
          },
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    fireEvent.input(screen.getByLabelText("Telephone"), {
      target: { value: "+447700900077" },
    });
    fireEvent.input(screen.getByLabelText("Message"), {
      target: { value: "This is a test message." },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findByTestId("success-msg")).not.toBeNull();
  });

  it("handles errors", async () => {
    const mocks = [
      {
        request: {
          query: SEND_MESSAGE,
          variables: {
            input: { msg: "This is a test message.", tel: "+447700900077" },
          },
        },
        result: {
          data: {
            sendMessage: null,
          },
          errors: [new GraphQLError("Uh oh")],
        },
      },
    ];
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    fireEvent.input(screen.getByLabelText("Telephone"), {
      target: { value: "+447700900077" },
    });
    fireEvent.input(screen.getByLabelText("Message"), {
      target: { value: "This is a test message." },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findByTestId("error-msg")).not.toBeNull();
  });
});

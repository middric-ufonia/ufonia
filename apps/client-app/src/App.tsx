import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import Input from "./components/Input";
import Textarea from "./components/Textarea";

type Inputs = {
  tel: string;
  msg: string;
};

export const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput) {
    sendMessage(input: $input) {
      code
      success
    }
  }
`;

function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();

  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE, {
    onError: () => {},
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    sendMessage({ variables: { input: { msg: data.msg, tel: data.tel } } });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="tel"
          label="Telephone"
          type="tel"
          register={register}
          error={errors.tel}
          required
        />

        <Textarea
          id="msg"
          label="Message"
          register={register}
          error={errors.msg}
          required
        />

        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send
          </button>
          {loading && <p data-testid="loading-msg">Submitting...</p>}
          {error && (
            <p data-testid="error-msg">Submission error! {error.message}</p>
          )}
          {data && <p data-testid="success-msg">Success!</p>}
        </div>
      </form>
    </div>
  );
}

export default App;

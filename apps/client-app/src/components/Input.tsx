import InputWrapper from "./InputWrapper";

interface InputProps {
  label: string;
  id: string;
  type: string;
  required: Boolean;
  register: Function;
  error: unknown;
}

export default function Input({
  label,
  id,
  type,
  required,
  register,
  error,
}: InputProps) {
  return (
    <InputWrapper label={label} id={id} error={error}>
      <input
        id={id}
        type={type}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register(id, { required })}
      />
    </InputWrapper>
  );
}

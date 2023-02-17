import InputWrapper from "./InputWrapper";

interface TextareaProps {
  label: string;
  id: string;
  required: Boolean;
  register: Function;
  error: unknown;
}

export default function Textarea({
  label,
  id,
  required,
  register,
  error,
}: TextareaProps) {
  return (
    <InputWrapper label={label} id={id} error={error}>
      <textarea
        id={id}
        rows={3}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register(id, { required })}
      />
    </InputWrapper>
  );
}

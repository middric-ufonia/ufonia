import { PropsWithChildren } from "react";

interface InputWrapperProps {
  label: string;
  id: string;
  error: unknown;
}

export default function InputWrapper({
  children,
  id,
  label,
  error,
}: PropsWithChildren<InputWrapperProps>) {
  return (
    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 sm:col-span-2">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          {children}
          <>
            {error && (
              <p className="mt-2 text-sm text-red-500">
                This field is required
              </p>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

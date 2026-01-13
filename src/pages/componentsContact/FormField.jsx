// Form Field Component

export const FormField = ({
  label,
  type = "text",
  placeholder,
  register,
  errors,
  fieldName,
  disabled = false,
  onInput,
  rows,
}) => {
  const isTextarea = type === "textarea";
  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
      </label>
      <InputComponent
        type={!isTextarea ? type : undefined}
        rows={isTextarea ? rows : undefined}
        {...register(fieldName)}
        disabled={disabled}
        onInput={onInput}
        className={`w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
          isTextarea ? "resize-none" : ""
        } ${disabled ? "bg-gray-50 cursor-not-allowed text-gray-600" : ""}`}
        placeholder={placeholder}
      />
      {errors[fieldName] && (
        <p className="mt-1 text-xs text-red-600 font-semibold">
          {errors[fieldName].message}
        </p>
      )}
    </div>
  );
};

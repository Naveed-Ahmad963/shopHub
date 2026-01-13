// src/features/modals/components/FormField.jsx
import * as LucideIcons from "lucide-react";

const FormField = ({
  label,
  icon: iconName,
  name,
  type = "text",
  register,
  validation,
  error,
  options,
  rows = 4,
  step,
  placeholder,
  showPassword,
  onTogglePassword,
  disabled,
}) => {
  const Icon = iconName ? LucideIcons[iconName] : null;

  const baseInputClass =
    "w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all";
  const borderClass = error ? "border-red-500" : "border-blue-200";

  const renderField = () => {
    const fieldProps = {
      className: `${baseInputClass} ${borderClass}`,
      placeholder,
      disabled,
      ...(validation && { ...register(name, validation) }),
    };

    if (type === "textarea") {
      return (
        <textarea
          {...fieldProps}
          rows={rows}
          className={`${fieldProps.className} resize-none`}
        />
      );
    }

    if (type === "select") {
      return (
        <select {...fieldProps} className={`${fieldProps.className} bg-white`}>
          <option value="">Select an option</option>
          {options?.map((opt) => (
            <option key={opt._id} value={opt._id}>
              {opt.name}
            </option>
          ))}
        </select>
      );
    }

    if (type === "password") {
      return (
        <div className="relative">
          <input
            {...fieldProps}
            type={showPassword ? "text" : "password"}
            className={`${fieldProps.className} pr-10`}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <LucideIcons.EyeOff className="w-4 h-4" />
            ) : (
              <LucideIcons.Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      );
    }

    return <input {...fieldProps} type={type} step={step} />;
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </label>
      {renderField()}
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-600 rounded-full"></span>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;

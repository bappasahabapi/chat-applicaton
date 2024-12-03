import { useState } from "react";

function InputField({ id, name, type, placeholder, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {name}
      </label>
      <input
        id={id}
        name={name}
        type={isPasswordField && showPassword ? "text" : type}
        autoComplete={name}
        required
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 text-xl  "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            '🔒'
          ) : (
           '👀'
          )}
        </button>
      )}
    </div>
  );
}

export default InputField;

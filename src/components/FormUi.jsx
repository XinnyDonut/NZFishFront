
const FormContainer = ({ children, title, error }) => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      )}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}
      {children}
    </div>
  );
};


const FormGroup = ({ label, children, className = "" }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
      )}
      {children}
    </div>
  );
};


const Input = ({ type = "text", ...props }) => {
  return (
    <input
      type={type}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
      {...props}
    />
  );
};


const TextArea = (props) => {
  return (
    <textarea
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 min-h-[120px]"
      {...props}
    />
  );
};


const Button = ({ variant = "primary", className = "", ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-ocean-600 text-white hover:bg-ocean-700",
    secondary: "px-1 py-1 text-xs bg-gray-200 text-gray-800 hover:bg-gray-300 ",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export { FormContainer, FormGroup, Input, TextArea, Button };
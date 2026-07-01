type Props = {
  message?: string;
  className?: string;
};

const AuthError = ({
  message,
  className = "",
}: Props) => {

  if (!message) return null;

  return (
    <p
      className={`
        rounded-md
        border
        border-danger-light
        bg-danger-light

        px-md
        py-sm

        text-body-sm
        font-medium
        text-danger-dark

        ${className}
      `}
    >
      {message}
    </p>
  );
};

export default AuthError;
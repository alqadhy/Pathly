type Props = {
  message?: string;
};

const AuthError = ({ message }: Props) => {
  if (!message) return null;

  return (
    <p className="text-sm font-medium text-red-500">
      {message}
    </p>
  );
};

export default AuthError;
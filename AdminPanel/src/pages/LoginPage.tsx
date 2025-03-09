
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-hersaki-light-purple to-hersaki-blue p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

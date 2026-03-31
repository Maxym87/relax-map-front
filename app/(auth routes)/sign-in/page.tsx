import LoginForm from "@/components/LoginForm/LoginForm";
import css from "./LoginForm.module.css";

const LoginPage = () => {
  return (
    <>
      <h1 className={css.title}>Вхід</h1>
      <LoginForm />
    </>
  );
};

export default LoginPage;

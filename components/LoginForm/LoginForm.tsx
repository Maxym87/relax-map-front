export default function LoginForm() {
  return (
    <form>
      <h1>Вхід</h1>

      <div>
        <label htmlFor="email">Пошта*</label>
        <input id="email" type="email" placeholder="hello@relaxmap.ua" />
      </div>

      <div>
        <label htmlFor="password">Пароль*</label>
        <input id="password" type="password" placeholder="••••••••" />
      </div>

      <button type="submit">Увійти</button>
    </form>
  );
}

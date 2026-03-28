export default function RegistrationForm() {
  return (
    <form>
      <h1>Реєстрація</h1>

      <div>
        <label htmlFor="name">Ім'я*</label>
        <input id="name" type="text" placeholder="Ваше ім'я" />
      </div>

      <div>
        <label htmlFor="email">Пошта*</label>
        <input id="email" type="email" placeholder="hello@relaxmap.ua" />
      </div>

      <div>
        <label htmlFor="password">Пароль*</label>
        <input id="password" type="password" placeholder="••••••••" />
      </div>

      <button type="submit">Зареєструватись</button>
    </form>
  );
}

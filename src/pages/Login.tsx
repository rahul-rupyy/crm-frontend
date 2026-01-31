import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import {
  container,
  card,
  heading,
  subtext,
  linkPrimary,
  alertError,
  form as formCls,
  label,
  input,
  buttonPrimary,
} from '../styles/authStyles';
import { loginText } from '../constants/loginConstants';

type LoginForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await login({ email: form.email.trim(), password: form.password });
      if (res?.token) {
        navigate('/leads');
      } else {
        setError(loginText.errorNoToken);
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        loginText.errorDefault;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={container}>
      <div className={card}>
        <h1 className={heading}>{loginText.heading}</h1>
        <p className={subtext}>
          {loginText.subtext}{' '}
          <Link to='/signup' className={linkPrimary}>
            {loginText.signupLinkText}
          </Link>
        </p>
        {error && <div className={alertError}>{error}</div>}
        <form onSubmit={handleSubmit} className={formCls}>
          <div>
            <label className={label} htmlFor='email'>
              {loginText.emailLabel}
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={form.email}
              onChange={handleChange}
              required
              className={input}
              placeholder={loginText.emailPlaceholder}
            />
          </div>
          <div>
            <label className={label} htmlFor='password'>
              {loginText.passwordLabel}
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={form.password}
              onChange={handleChange}
              required
              className={input}
              placeholder={loginText.passwordPlaceholder}
            />
          </div>
          <button type='submit' disabled={loading} className={buttonPrimary}>
            {loading ? loginText.buttonLoadingText : loginText.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/auth';
import { type SignupForm } from '../types/index';
import {
  container,
  card,
  heading,
  subtext,
  linkPrimary,
  alertError,
  alertSuccess,
  form as formCls,
  label,
  input,
  buttonPrimary,
} from '../styles/authStyles';
import { signupText } from '../constants/signupConstants';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    secretKey: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (form.password !== form.confirmPassword) {
      setError(signupText.errorPasswordMismatch);
      return;
    }
    try {
      setLoading(true);
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        secretKey: form.secretKey?.trim() || undefined,
      });
      setSuccess(signupText.successMessage);
      setTimeout(() => navigate('/login'), 800);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        signupText.errorDefault;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={container}>
      <div className={card}>
        <h1 className={heading}>{signupText.heading}</h1>
        <p className={subtext}>
          {signupText.subtext}{' '}
          <Link to='/login' className={linkPrimary}>
            {signupText.loginLinkText}
          </Link>
        </p>
        {error && <div className={alertError}>{error}</div>}
        {success && <div className={alertSuccess}>{success}</div>}
        <form onSubmit={handleSubmit} className={formCls}>
          <div>
            <label className={label} htmlFor='name'>
              {signupText.nameLabel}
            </label>
            <input
              id='name'
              name='name'
              type='text'
              value={form.name}
              onChange={handleChange}
              required
              className={input}
              placeholder={signupText.namePlaceholder}
            />
          </div>
          <div>
            <label className={label} htmlFor='email'>
              {signupText.emailLabel}
            </label>
            <input
              id='email'
              name='email'
              type='email'
              value={form.email}
              onChange={handleChange}
              required
              className={input}
              placeholder={signupText.emailPlaceholder}
            />
          </div>
          <div>
            <label className={label} htmlFor='password'>
              {signupText.passwordLabel}
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={form.password}
              onChange={handleChange}
              required
              className={input}
              placeholder={signupText.passwordPlaceholder}
            />
          </div>
          <div>
            <label className={label} htmlFor='confirmPassword'>
              {signupText.confirmPasswordLabel}
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className={input}
              placeholder={signupText.confirmPasswordPlaceholder}
            />
          </div>
          <div>
            <label className={label} htmlFor='secretKey'>
              {signupText.secretKeyLabel}
            </label>
            <input
              id='secretKey'
              name='secretKey'
              type='text'
              value={form.secretKey}
              onChange={handleChange}
              className={input}
              placeholder={signupText.secretKeyPlaceholder}
            />
          </div>
          <button type='submit' disabled={loading} className={buttonPrimary}>
            {loading ? signupText.buttonLoadingText : signupText.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

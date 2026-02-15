import api from './axios';
import Cookies from 'js-cookie';
import { type SignupPayload, type LoginPayload, type AuthData } from '../types/index';

export const signup = async (payload: SignupPayload): Promise<AuthData> => {
  const res = await api.post('/auth/signup', payload);

  return res.data.data as AuthData;
};

export const login = async (payload: LoginPayload): Promise<AuthData> => {
  const res = await api.post('/auth/login', payload);
  const data = res.data.data as AuthData;
  if (data?.access_token) {
    Cookies.set('token', data.access_token);
  }
  return data;
};

import api from './axios';
import Cookies from 'js-cookie';
import { type SignupPayload, type LoginPayload } from '../types/index';

export const signup = async (payload: SignupPayload) => {
  const { data } = await api.post('/auth/signup', payload);
  return data;
};

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post('/auth/login', payload);
  if (data?.token) {
    Cookies.set('token', data.token);
  }
  return data;
};

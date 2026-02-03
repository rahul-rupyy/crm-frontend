export type LeadStatus = 'new' | 'contacted' | 'interested' | 'converted';
export type LeadSource = 'website' | 'referral' | 'ad' | 'manual';
export type Role = 'admin' | 'user';

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  secretKey?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};

export type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  secretKey?: string;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

// Auth response types based on backend payload
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AuthData {
  access_token: string;
  user: AuthUser;
}

export interface Note {
  _id: string;
  text: string;
  leadId: string;
  createdBy: User;
  createdAt: string;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteProps {
  leadId: string;
}
export interface CreateLeadPayload {
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  status?: LeadStatus;
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
export interface ApiError {
  response?: { data?: { message?: string } };
  message?: string;
}

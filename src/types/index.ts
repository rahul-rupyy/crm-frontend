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

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
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

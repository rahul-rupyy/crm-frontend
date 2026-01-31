export type LeadStatus = 'new' | 'contacted' | 'interested' | 'converted';
export type LeadSource = 'website' | 'referral' | 'ad' | 'manual';
export type Role = 'admin' | 'user';

export interface User {
  id: string;
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
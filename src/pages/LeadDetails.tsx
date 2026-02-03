import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLead, updateLead } from '../api/leads';
import NoteList from '../components/NoteList';
import type { Lead, LeadStatus } from '../types';
import { ArrowLeft, Edit2, Save, X, Phone, Mail, Globe, User, Calendar } from 'lucide-react';
import AddNote from '../components/AddNote';
import { useNotes } from '../hooks/useNotes';

interface ApiError {
  response?: { data?: { message?: string | string[] } };
  message?: string;
}

const LeadDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Lead>>({});
  const notesState = useNotes(id ?? '');

  useEffect(() => {
    const fetchLead = async () => {
      try {
        if (!id) return;
        const data = await getLead(id);
        setLead(data);
        setFormData(data);
      } catch (err: unknown) {
        console.error(err);
        setError('Failed to load lead details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead || !id) return;
    try {
      const updated = await updateLead(id, { status: newStatus });
      setLead(updated);
      setFormData(updated);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Failed to update status';
      alert(Array.isArray(msg) ? msg.join('\n') : msg);
    }
  };

  const handleSave = async () => {
    if (!id) return;
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        source: formData.source,
        assignedTo: formData.assignedTo,
      };

      const updated = await updateLead(id, payload);
      setLead(updated);
      setIsEditing(false);
    } catch (err: unknown) {
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Failed to update lead';
      alert(Array.isArray(msg) ? msg.join('\n') : msg);
    }
  };

  if (loading) return <div className='p-10 text-center'>Loading...</div>;
  if (error || !lead) return <div className='p-10 text-center text-red-500'>{error}</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interested':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'converted':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-8 text-gray-900 dark:text-gray-100'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-6'>
          <button
            onClick={() => navigate('/leads')}
            className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition'
          >
            <ArrowLeft size={20} /> Back to Leads
          </button>

          <div className='flex gap-2'>
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className='px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2'
                >
                  <X size={18} /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2'
                >
                  <Save size={18} /> Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className='px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2'
              >
                <Edit2 size={18} /> Edit Details
              </button>
            )}
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
          <div className='p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-start'>
            <div>
              {isEditing ? (
                <input
                  className='text-2xl font-bold bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-full'
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <h1 className='text-3xl font-bold'>{lead.name}</h1>
              )}
              <div className='flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400'>
                <span className='flex items-center gap-1'>
                  <Calendar size={14} /> Created: {new Date(lead.createdAt).toLocaleDateString()}
                </span>
                <span className='flex items-center gap-1 capitalize'>
                  <Globe size={14} /> Source: {lead.source}
                </span>
              </div>
            </div>
            <div
              className={`px-4 py-2 rounded-full border text-sm font-semibold uppercase tracking-wide ${getStatusColor(lead.status)}`}
            >
              {lead.status}
            </div>
          </div>

          <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
            <h3 className='text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3'>
              Update Status
            </h3>
            <div className='flex flex-wrap gap-2'>
              {['new', 'contacted', 'interested', 'converted'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status as LeadStatus)}
                  disabled={lead.status === status}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${lead.status === status ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-default' : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:text-blue-600'}`}
                >
                  Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            <p className='text-xs text-gray-400 mt-2'>
              * Rules: You can only move forward one step at a time. Only Admins can mark
              'Converted'.
            </p>
          </div>

          <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold border-b border-gray-100 dark:border-gray-700 pb-2'>
                Contact Information
              </h3>
              <div className='flex items-center gap-3'>
                <Mail className='text-gray-400' size={20} />
                {isEditing ? (
                  <input
                    className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1'
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <a href={`mailto:${lead.email}`} className='text-blue-600 hover:underline'>
                    {lead.email}
                  </a>
                )}
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='text-gray-400' size={20} />
                {isEditing ? (
                  <input
                    className='flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1'
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                ) : (
                  <span className='text-gray-700 dark:text-gray-300'>{lead.phone}</span>
                )}
              </div>
            </div>
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold border-b border-gray-100 dark:border-gray-700 pb-2'>
                System Info
              </h3>
              <div className='flex items-center gap-3'>
                <User className='text-gray-400' size={20} />
                <div>
                  <p className='text-xs text-gray-500'>Assigned To (ID)</p>
                  <p className='font-mono text-sm'>{lead.assignedTo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center text-gray-500'>
          <AddNote onAdd={notesState.createNot} />
        </div>

        <div className='mt-8'>
          <NoteList
            leadId={lead._id}
            notes={notesState.notes}
            loading={notesState.loading}
            error={notesState.error}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

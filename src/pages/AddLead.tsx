import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLead } from '../api/leads';
import type { LeadSource, LeadStatus } from '../types';
import { ArrowLeft, Save } from 'lucide-react';
import Cookies from 'js-cookie';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  userId?: string;
  sub?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
  message?: string;
}

const AddLead: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: 'manual' as LeadSource,
    status: 'new' as LeadStatus,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('You are not logged in');

      const decoded = jwtDecode<CustomJwtPayload>(token);
      const myUserId = decoded.userId || decoded.sub;

      if (!myUserId) throw new Error('Invalid token: No User ID found');

      const payload = {
        ...formData,
        assignedTo: myUserId,
      };

      await createLead(payload);
      navigate('/leads');
    } catch (err: unknown) {
      const apiError = err as ApiError;
      console.error(apiError);

      const msg = apiError.response?.data?.message || apiError.message || 'Failed to create lead';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-8 transition-colors duration-200'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex items-center gap-4 mb-8'>
          <button
            onClick={() => navigate('/leads')}
            className='p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition'
          >
            <ArrowLeft className='text-gray-600 dark:text-gray-300' size={24} />
          </button>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Add New Lead</h1>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8'>
          {error && (
            <div className='mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700'>
              <p className='font-medium'>Error</p>
              <p className='text-sm'>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                Full Name *
              </label>
              <input
                type='text'
                name='name'
                required
                value={formData.name}
                onChange={handleChange}
                placeholder='e.g. Jane Doe'
                className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Email Address *
                </label>
                <input
                  type='email'
                  name='email'
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='jane@example.com'
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Phone Number *
                </label>
                <input
                  type='tel'
                  name='phone'
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder='+1 234 567 890'
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition'
                />
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Lead Source
                </label>
                <select
                  name='source'
                  value={formData.source}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition capitalize'
                >
                  {['website', 'referral', 'ad', 'manual'].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
                  Initial Status
                </label>
                <select
                  name='status'
                  value={formData.status}
                  onChange={handleChange}
                  className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition capitalize'
                >
                  {['new', 'contacted', 'interested', 'converted'].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex justify-end pt-4 gap-3'>
              <button
                type='button'
                onClick={() => navigate('/leads')}
                className='px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={loading}
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Lead'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLead;

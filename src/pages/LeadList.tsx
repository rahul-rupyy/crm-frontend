import React, { useEffect, useState } from 'react';
import { getLeads, deleteLead } from '../api/leads';
import type { ApiError, Lead } from '../types';
import { Plus, Search, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeadsList: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      if (Array.isArray(data)) {
        setLeads(data);
      } else {
        console.warn('API returned non-array data:', data);
        setLeads([]);
      }
    } catch (err: unknown) {
      const apiError = err as ApiError;
      console.error(apiError);
      setError(apiError.response?.data?.message || 'Failed to fetch leads.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err: unknown) {
      console.error('Delete failed', err);
      alert('Failed to delete lead. You might need Admin permissions.');
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (!lead) return false;
    const term = search.toLowerCase();
    const name = lead.name?.toLowerCase() || '';
    const email = lead.email?.toLowerCase() || '';
    return name.includes(term) || email.includes(term);
  });

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-8 text-gray-900 dark:text-gray-100 transition-colors duration-200'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold'>Leads</h1>
            <p className='text-gray-500 dark:text-gray-400 mt-1'>Manage your sales pipeline</p>
          </div>
          <button
            onClick={() => navigate('/leads/new')}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition'
          >
            <Plus size={20} /> New Lead
          </button>
        </div>

        <div className='bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 flex gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-3 text-gray-400' size={20} />
            <input
              type='text'
              placeholder='Search by name or email...'
              className='w-full pl-10 pr-4 py-2 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-400'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'>
          {loading ? (
            <div className='p-10 text-center text-gray-500'>Loading leads...</div>
          ) : error ? (
            <div className='p-10 text-center text-red-500'>{error}</div>
          ) : (
            <table className='w-full text-left'>
              <thead className='bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600'>
                <tr>
                  <th className='px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Status
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Source
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                    Created
                  </th>
                  <th className='px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider text-right'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className='px-6 py-8 text-center text-gray-500'>
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead._id}
                      onClick={() => navigate(`/leads/${lead._id}`)}
                      className='hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer'
                    >
                      <td className='px-6 py-4'>
                        <div className='font-medium'>{lead.name}</div>
                        <div className='text-sm text-gray-500 dark:text-gray-400'>{lead.email}</div>
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${lead.status === 'new' ? 'bg-blue-100 text-blue-800' : lead.status === 'converted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-600 dark:text-gray-400 capitalize'>
                        {lead.source}
                      </td>
                      <td className='px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className='px-6 py-4 text-right'>
                        <button
                          onClick={(e) => handleDelete(lead._id, e)}
                          className='text-red-500 hover:text-red-700 p-2'
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsList;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardMetrics, getDashboardLeads } from '../api/dashboard';
import DashboardCards from '../components/dashboard/DashboardCards';
import DashboardFilters from '../components/dashboard/DashboardFilters';
import SearchBar from '../components/dashboard/SearchBar';
import LeadCard from '../components/dashboard/LeadCard';
import type { DashboardMetrics, Lead, DashboardFiltersState } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<DashboardFiltersState>({
    status: [],
    source: [],
  });

  useEffect(() => {
    getDashboardMetrics()
      .then((data) => setMetrics(data))
      .catch((err) => console.error('Error fetching metrics:', err));
  }, []);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await getDashboardLeads({
          status: filters.status.length > 0 ? filters.status.join(',') : undefined,
          source: filters.source.length > 0 ? filters.source.join(',') : undefined,
          search: search || undefined,
        });
        setLeads(data);
      } catch (err) {
        console.error('Error fetching leads:', err);
      }
    };

    fetchLeads();
  }, [filters, search]);

  return (
    <div className='p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen'>
      {/* Header Section: Title on left, Button on top right */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Dashboard</h1>

        <button
          onClick={() => navigate('/leads')}
          className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2'
        >
          <span>View All Leads</span>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 7l5 5m0 0l-5 5m5-5H6'
            />
          </svg>
        </button>
      </div>

      {/* Metrics Section */}
      {metrics ? (
        <DashboardCards metrics={metrics} />
      ) : (
        <div className='h-32 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl animate-pulse'>
          <p className='text-gray-400'>Loading metrics...</p>
        </div>
      )}

      {/* Filter and Search Bar Section */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <DashboardFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className='w-full md:w-auto'>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      {/* Leads Grid Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {leads.length > 0 ? (
          leads.map((lead) => <LeadCard key={lead._id} lead={lead} />)
        ) : (
          <p className='col-span-full text-center text-gray-500 py-10'>
            No leads found matching these criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

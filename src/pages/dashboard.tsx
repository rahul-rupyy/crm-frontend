import { useEffect, useState } from 'react';
import { getDashboardMetrics, getDashboardLeads } from '../api/dashboard';
import DashboardCards from '../components/dashboard/DashboardCards';
import DashboardFilters from '../components/dashboard/DashboardFilters';
import SearchBar from '../components/dashboard/SearchBar';
import LeadCard from '../components/dashboard/LeadCard';
import type { DashboardMetrics, Lead, DashboardFiltersState } from '../types';

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<DashboardFiltersState>({
    status: [],
    source: [],
  });

  // Fetch Metrics once on mount
  useEffect(() => {
    getDashboardMetrics()
      .then((data) => setMetrics(data))
      .catch((err) => console.error('Error fetching metrics:', err));
  }, []);

  // Fetch Leads whenever filters or search change
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
      <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Dashboard</h1>

      {/* Only render cards if metrics is not null */}
      {metrics ? (
        <DashboardCards metrics={metrics} />
      ) : (
        <div className='h-32 flex items-center justify-center bg-white rounded-lg animate-pulse'>
          <p className='text-gray-400'>Loading metrics...</p>
        </div>
      )}

      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <DashboardFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className='w-full md:w-auto'>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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

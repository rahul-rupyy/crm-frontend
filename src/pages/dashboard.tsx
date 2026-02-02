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

  useEffect(() => {
    getDashboardMetrics().then((res) => {
      setMetrics(res.data);
    });
  }, []);

  useEffect(() => {
    getDashboardLeads({
      status: filters.status,
      source: filters.source,
      search,
    }).then((res) => {
      setLeads(res.data);
    });
  }, [filters, search]);

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      {metrics && <DashboardCards metrics={metrics} />}

      <div className='flex flex-wrap gap-4'>
        <DashboardFilters filters={filters} setFilters={setFilters} />
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {leads.map((lead) => (
          <LeadCard key={lead._id} lead={lead} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

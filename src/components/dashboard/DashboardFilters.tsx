import type { DashboardFiltersState, LeadStatus, LeadSource } from '../../types';

interface Props {
  filters: DashboardFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<DashboardFiltersState>>;
}

const statusOptions: LeadStatus[] = ['new', 'contacted', 'interested', 'converted'];
const sourceOptions: LeadSource[] = ['website', 'referral', 'ad', 'manual'];

const DashboardFilters = ({ filters, setFilters }: Props) => {
  const handleChange = (key: 'status' | 'source', value: string) => {
    // If "All" is selected, we pass an empty array to the filter
    setFilters((prev) => ({
      ...prev,
      [key]: value === '' ? [] : [value],
    }));
  };

  const selectClass =
    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm cursor-pointer outline-none';

  return (
    <div className='flex gap-3'>
      <select
        className={selectClass}
        value={filters.status[0] || ''}
        onChange={(e) => handleChange('status', e.target.value)}
      >
        <option value=''>All Statuses</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={filters.source[0] || ''}
        onChange={(e) => handleChange('source', e.target.value)}
      >
        <option value=''>All Sources</option>
        {sourceOptions.map((source) => (
          <option key={source} value={source}>
            {source.charAt(0).toUpperCase() + source.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DashboardFilters;

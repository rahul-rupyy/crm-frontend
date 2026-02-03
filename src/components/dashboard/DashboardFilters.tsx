import type { DashboardFiltersState, LeadStatus, LeadSource } from '../../types';

interface Props {
  filters: DashboardFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<DashboardFiltersState>>;
}

const statusOptions: LeadStatus[] = ['new', 'contacted', 'interested', 'converted'];

const sourceOptions: LeadSource[] = ['website', 'referral', 'ad', 'manual'];

const DashboardFilters = ({ filters, setFilters }: Props) => {
  const toggleValue = (key: 'status' | 'source', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value as never)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value as never],
    }));
  };

  return (
    <div className='flex gap-4'>
      <select
        multiple
        className='border rounded p-2'
        value={filters.status}
        onChange={(e) => toggleValue('status', e.target.value)}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        multiple
        className='border rounded p-2'
        value={filters.source}
        onChange={(e) => toggleValue('source', e.target.value)}
      >
        {sourceOptions.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DashboardFilters;

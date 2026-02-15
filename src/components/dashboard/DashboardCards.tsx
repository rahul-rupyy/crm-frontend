import type { DashboardMetrics } from '../../types';

interface Props {
  metrics: DashboardMetrics;
}

const DashboardCards = ({ metrics }: Props) => {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <Card title='Total Leads' value={metrics?.totalLeads ?? 0} color='border-gray-200' />
        <Card title='Assigned Leads' value={metrics?.assignedLeads ?? 0} color='border-blue-200' />
        {/* <Card title='Total Converted' value={metrics?.convertedLeads ?? 0} color="border-emerald-200" /> */}
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card title='New' value={metrics?.leadsByStatus?.['new'] ?? 0} small />
        <Card title='Contacted' value={metrics?.leadsByStatus?.['contacted'] ?? 0} small />
        <Card title='Interested' value={metrics?.leadsByStatus?.['interested'] ?? 0} small />
        <Card title='Converted' value={metrics?.leadsByStatus?.['converted'] ?? 0} small />
      </div>
    </div>
  );
};

const Card = ({
  title,
  value,
  small,
  color,
}: {
  title: string;
  value: number;
  small?: boolean;
  color?: string;
}) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border ${color || 'border-gray-100 dark:border-gray-700'}`}
  >
    <p
      className={`text-gray-500 dark:text-gray-400 font-medium ${small ? 'text-xs uppercase tracking-wider' : 'text-sm'}`}
    >
      {title}
    </p>
    <p className={`${small ? 'text-xl' : 'text-3xl'} font-bold text-gray-900 dark:text-white mt-1`}>
      {value}
    </p>
  </div>
);

export default DashboardCards;

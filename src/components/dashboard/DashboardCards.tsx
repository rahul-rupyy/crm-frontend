import type { DashboardMetrics } from '../../types';

interface Props {
  metrics: DashboardMetrics;
}

const DashboardCards = ({ metrics }: Props) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
      <Card title='Total Leads' value={metrics.totalLeads} />
      <Card title='Assigned Leads' value={metrics.assignedLeads} />
      <Card title='Converted Leads' value={metrics.convertedLeads} />
      <Card title='New Leads' value={metrics.leadsByStatus.new} />
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: number }) => (
  <div className='bg-white rounded-lg shadow p-4'>
    <p className='text-sm text-gray-500'>{title}</p>
    <p className='text-2xl font-bold'>{value}</p>
  </div>
);

export default DashboardCards;

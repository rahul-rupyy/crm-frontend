import type { Lead } from '../../types';

interface Props {
  lead: Lead;
}

const LeadCard = ({ lead }: Props) => {
  return (
    <div className='bg-white p-4 rounded shadow'>
      <h3 className='font-semibold'>{lead.name}</h3>
      <p className='text-sm text-gray-600'>{lead.email}</p>
      <p className='text-sm'>Status: {lead.status}</p>
      <p className='text-sm'>Source: {lead.source}</p>
    </div>
  );
};

export default LeadCard;

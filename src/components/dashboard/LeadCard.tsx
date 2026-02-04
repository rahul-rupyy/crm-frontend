import { useNavigate } from 'react-router-dom';
import type { Lead } from '../../types';

interface Props {
  lead: Lead;
}

const LeadCard = ({ lead }: Props) => {
  const navigate = useNavigate();

  const badgeStyles: Record<string, string> = {
    new: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    contacted: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    interested: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    converted: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
  };

  return (
    <div
      onClick={() => navigate(`/leads/${lead._id}`)}
      className='bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md hover:ring-1 hover:ring-blue-500/30 transition-all cursor-pointer flex flex-col gap-4'
    >
      <div className='flex justify-between items-start'>
        <span
          className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${badgeStyles[lead.status] || 'bg-gray-100 text-gray-600'}`}
        >
          {lead.status}
        </span>
        <button className='text-gray-300 hover:text-gray-500 transition-colors'>
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z' />
          </svg>
        </button>
      </div>

      <div>
        <h3 className='text-base font-semibold text-gray-900 dark:text-white leading-snug'>
          {lead.name}
        </h3>
        <p className='text-sm font-medium text-gray-500 dark:text-gray-400 mt-0.5'>{lead.email}</p>
      </div>

      <div className='pt-4 border-t border-gray-50 dark:border-gray-700/50 flex flex-col gap-1.5'>
        <div className='flex items-center justify-between'>
          <span className='text-[12px] text-gray-400 font-normal'>Source</span>
          <span className='text-[12px] text-gray-700 dark:text-gray-300 font-medium capitalize'>
            {lead.source}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-[12px] text-gray-400 font-normal'>Created</span>
          <span className='text-[12px] text-gray-700 dark:text-gray-300 font-medium'>
            {new Date(lead.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;

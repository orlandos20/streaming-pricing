interface ActiveBadgeProps {
  show: boolean;
}

const ActiveBadge: React.FC<ActiveBadgeProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className='flex absolute -top-1.5 -right-1.5 bg-blue-500 rounded-full p-0.5 shadow-lg'>
      <span className='material-symbols-outlined text-white text-[12px] font-black block'>
        check
      </span>
    </div>
  );
};

export default ActiveBadge;

import LevelLowIcon from '@assets/icons/LevelNOW/level-low.svg?component';
import OilFillingIcon from '@assets/icons/LevelNOW/oil-filling.svg?component';

interface StatusCellProps {
  issue: string;
  issueType: 'warning' | 'info';
}

export default function IssueCell({ issue, issueType }: StatusCellProps) {
  return (
    <div className='flex flex-col items-center w-fit'>
      {issueType === 'warning' ? <LevelLowIcon /> : <OilFillingIcon />}
      <div
        className={`text-md font-medium tracking-32 ${issueType === 'warning' ? 'text-error-500' : 'text-primary-500'}`}
      >
        {issue}
      </div>
    </div>
  );
}

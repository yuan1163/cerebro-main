import { useUI } from '@core/storages/ui';
import { Select, SelectOption } from '@core/ui/components/Select';
import { useNavigate } from 'react-router';

export const getPageSwitch = () => {
  const navigate = useNavigate();

  return {
    toggleButtons: [
      { label: 'Summary', value: 'summary' },
      { label: 'Management', value: 'management' },
    ],
    toggleLists: (button?: string) => {
      switch (button) {
        case 'summary':
          navigate(`../summary`);
          break;
        case 'management':
          navigate(`../management/product`);
          break;
      }
    },
  };
};

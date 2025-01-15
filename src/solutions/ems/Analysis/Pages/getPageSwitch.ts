import { useUI } from '@core/storages/ui';
import { Select, SelectOption } from '@core/ui/components/Select';
import { useNavigate } from 'react-router';

export const getPageSwitch = () => {
  const navigate = useNavigate();

  return {
    toggleButtons: [
      { label: 'Node', value: 'node_summary' },
      { label: 'Circuit', value: 'circuit_summary' },
    ],
    toggleLists: (button?: string) => {
      switch (button) {
        case 'node_summary':
          navigate(`../node_summary`);
          break;
        case 'circuit_summary':
          navigate(`../circuit_summary`);
          break;
      }
    },
  };
};

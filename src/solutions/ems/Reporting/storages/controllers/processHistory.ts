import { queryClient } from '@app/DataAccessAdapter';
import { useMutation, useQuery } from '@tanstack/react-query';

// api
import {
  apiCreateProcessHistory,
  apiDeleteProcessHistory,
  apiGetProcessHistory,
  apiUpdateProcessHistory,
} from '../../api/entities/processHistory';

// data type
import { ProcessHistory, ProcessHistoryInput } from '../../data/processHistory';

const CONTROLLER = 'processHistory';

class ProcessHistoryController {
  processHistory?: ProcessHistory[];
  removeHandler?: (processHistory: Partial<ProcessHistory>) => void;

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.processHistory;
  }

  getData(): ProcessHistory[] {
    return this.processHistory!;
  }

  getEnergy(parameter: 'processId' | 'unitId' | 'productId', parameterId: number) {
    return 100;
  }

  remove(processHistory: Partial<ProcessHistory>) {
    this.removeHandler?.(processHistory);
  }

  constructor(processHistory?: ProcessHistory[], removeHandler?: (processHistory: Partial<ProcessHistory>) => void) {
    this.processHistory = processHistory;
    this.removeHandler = removeHandler;
  }
}

export const useProcessHistory = (processHistory: Partial<ProcessHistory>) => {
  const mtAdd = useMutation(apiCreateProcessHistory);
  const mtUpdate = useMutation(apiUpdateProcessHistory);
  const mtRemove = useMutation(apiDeleteProcessHistory);

  const get = (filter: Partial<ProcessHistoryInput>) => {
    const { data } = useQuery([CONTROLLER, filter], () => apiGetProcessHistory(filter), {
      staleTime: 1000 * 60 * 60,
      cacheTime: Infinity,
    });

    return data;
  };

  const add = async (processHistoryData: Partial<ProcessHistory>) => {
    // Create processHistory
    const { historyId } = await mtAdd.mutateAsync(processHistoryData);
    processHistory.historyId = historyId;

    await ProcessHistoryController.invalidate();
  };

  const update = async (processHistoryData: Partial<ProcessHistory>) => {
    // update processHistory
    await mtUpdate.mutateAsync(processHistoryData);
    await ProcessHistoryController.invalidate();
  };

  const remove = async (item: Partial<ProcessHistory>) => {
    await mtRemove.mutateAsync(item);
    await ProcessHistoryController.invalidate();
  };

  return {
    get,
    update,
    add,
    remove,
  };
};

import { queryClient } from '@app/DataAccessAdapter';
import { useMutation, useQuery } from '@tanstack/react-query';

// api
import { apiCreateProcess, apiDeleteProcess, apiGetProcess, apiUpdateProcess } from '../../api/entities/process';

// data type
import { Process, ProcessInput } from '../../data/process';

const CONTROLLER = 'process';

class ProcessController {
  process?: Process[];
  removeHandler?: (process: Partial<Process>) => void;

  static async invalidate() {
    return queryClient.invalidateQueries([CONTROLLER]);
  }

  hasData(): boolean {
    return !!this.process;
  }

  getData(): Process[] {
    return this.process!;
  }

  remove(process: Partial<Process>) {
    this.removeHandler?.(process);
  }

  constructor(process?: Process[], removeHandler?: (process: Partial<Process>) => void) {
    this.process = process;
    this.removeHandler = removeHandler;
  }
}

export const useProcess = (process: Partial<Process>) => {
  const mtAdd = useMutation(apiCreateProcess);
  const mtUpdate = useMutation(apiUpdateProcess);
  const mtRemove = useMutation(apiDeleteProcess);

  const get = (filter: Partial<ProcessInput>) => {
    const { data } = useQuery([CONTROLLER, filter], () => apiGetProcess(filter), {
      staleTime: 0,
      cacheTime: Infinity,
    });

    return data;
  };

  const add = async (processData: Partial<Process>) => {
    // Create process
    const { processId } = await mtAdd.mutateAsync(processData);
    process.processId = processId;

    await ProcessController.invalidate();
  };

  const update = async (processData: Partial<Process>) => {
    // update process
    await mtUpdate.mutateAsync(processData);

    await ProcessController.invalidate();
  };

  const remove = async (item: Partial<Process>) => {
    await mtRemove.mutateAsync(item);
    await ProcessController.invalidate();
  };

  return {
    get,
    update,
    add,
    remove,
  };
};
